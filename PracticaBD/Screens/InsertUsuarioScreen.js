import { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator, Platform, Modal } from 'react-native';
import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();

export default function InsertUsuarioScreen() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [editando, setEditando] = useState(false);
    const [eliminando, setEliminando] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [nombreEditado, setNombreEditado] = useState('');

    const cargarUsuarios = useCallback(async () => {
        try {
            setLoading(true);
            const datos = await controller.obtenerUsuarios();
            setUsuarios(datos);
        } catch (error) {
            Alert.alert('Error', 'No se pudieron cargar los usuarios.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            await controller.initialize();
            await cargarUsuarios();
        };
        init();
        controller.addListener(cargarUsuarios);

        return () => {
            controller.removeListener(cargarUsuarios);
        };
    }, [cargarUsuarios]);

    const handleAgregarUsuario = async () => {
        if (!nombre.trim()) {
            Alert.alert('Error', 'Por favor ingresa un nombre válido');
            return;
        }

        try {
            setGuardando(true);
            const usuarioCreado = await controller.crearUsuario(nombre);
            Alert.alert('Usuario creado', `"${usuarioCreado.nombre}" guardado con id: ${usuarioCreado.id}.`);
            setNombre('');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setGuardando(false);
        }
    };

    const handleEditarUsuario = (usuario) => {
        setUsuarioEditando(usuario);
        setNombreEditado(usuario.nombre);
        setModalVisible(true);
    };

    const handleActualizarUsuario = async () => {
        if (!nombreEditado.trim()) {
            Alert.alert('Error', 'Por favor ingresa un nombre válido');
            return;
        }

        try {
            setEditando(true);
            const usuarioActualizado = await controller.actualizarUsuario(usuarioEditando.id, nombreEditado);
            Alert.alert('Usuario actualizado', `"${usuarioActualizado.nombre}" actualizado correctamente.`);
            setModalVisible(false);
            setUsuarioEditando(null);
            setNombreEditado('');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setEditando(false);
        }
    };

    const handleEliminarUsuario = (usuario) => {
        Alert.alert(
            'Eliminar Usuario',
            `¿Estás seguro de que quieres eliminar a "${usuario.nombre}"?`,
            [
                { 
                    text: 'Cancelar', 
                    style: 'cancel' 
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setEliminando(true);
                            await controller.eliminarUsuario(usuario.id);
                            Alert.alert('Usuario eliminado', `"${usuario.nombre}" ha sido eliminado correctamente.`);
                        } catch (error) {
                            Alert.alert('Error', error.message);
                        } finally {
                            setEliminando(false);
                        }
                    }
                }
            ]
        );
    };

    const renderUsuario = ({ item, index }) => (
        <View style={styles.userItem}>
            <View style={styles.userNumber}>
                <Text style={styles.userNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nombre}</Text>
                <Text style={styles.userId}>ID: {item.id}</Text>
                <Text style={styles.userDate}>
                    Creado el: {new Date(item.fechaCreacion).toLocaleString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </Text>
            </View>
            <View style={styles.userActions}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => handleEditarUsuario(item)}
                    disabled={eliminando}
                >
                    <Text style={styles.actionButtonText}>
                        {eliminando ? '...' : 'Editar'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton, eliminando && styles.buttonDisabled]}
                    onPress={() => handleEliminarUsuario(item)}
                    disabled={eliminando}
                >
                    <Text style={styles.actionButtonText}>
                        {eliminando ? '...' : 'Eliminar'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Zona del encabezado */}
            <Text style={styles.title}>CRUD COMPLETO - USUARIOS</Text>
            <Text style={styles.subtitle}>
                {Platform.OS === 'web' ? 'WEB (LocalStorage)' : `${Platform.OS.toUpperCase()} (SQLite)`}
            </Text>

            {/* Zona del INSERT */}
            <View style={styles.insertSection}>
                <Text style={styles.sectionTitle}>Insertar Usuario</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Escribe el nombre del usuario"
                    value={nombre}
                    onChangeText={setNombre}
                    editable={!guardando && !eliminando}
                />

                <TouchableOpacity
                    style={[styles.button, (guardando || eliminando) && styles.buttonDisabled]}
                    onPress={handleAgregarUsuario}
                    disabled={guardando || eliminando}
                >
                    <Text style={styles.buttonText}>
                        {guardando ? 'Guardando...' : 'Agregar Usuario'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Zona del SELECT */}
            <View style={styles.selectSection}>
                <View style={styles.selectHeader}>
                    <Text style={styles.sectionTitle}>
                        Lista de Usuarios {usuarios.length > 0 && `(${usuarios.length})`}
                    </Text>
                    <TouchableOpacity
                        style={[styles.refreshButton, eliminando && styles.buttonDisabled]}
                        onPress={cargarUsuarios}
                        disabled={eliminando}
                    >
                        <Text style={styles.refreshText}>
                            {eliminando ? '...' : 'Recargar'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Cargando usuarios...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderUsuario}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No hay usuarios registrados</Text>
                                <Text style={styles.emptySubtext}>Agrega el primer usuario arriba</Text>
                            </View>
                        }
                        contentContainerStyle={usuarios.length === 0 && styles.emptyList}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            {/* Modal para editar usuario */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => !editando && setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Usuario</Text>
                        <Text style={styles.modalSubtitle}>ID: {usuarioEditando?.id}</Text>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Nuevo nombre del usuario"
                            value={nombreEditado}
                            onChangeText={setNombreEditado}
                            editable={!editando}
                        />
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton, editando && styles.buttonDisabled]}
                                onPress={() => setModalVisible(false)}
                                disabled={editando}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton, editando && styles.buttonDisabled]}
                                onPress={handleActualizarUsuario}
                                disabled={editando}
                            >
                                <Text style={styles.modalButtonText}>
                                    {editando ? 'Guardando...' : 'Guardar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'web' ? 20 : 50,
        paddingHorizontal: Platform.OS === 'web' ? 20 : 0,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
    },
    insertSection: {
        backgroundColor: '#fff',
        padding: 20,
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    selectSection: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 15,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    selectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    refreshButton: {
        padding: 8,
    },
    refreshText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 14,
    },
    userItem: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
        alignItems: 'center',
    },
    userNumber: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    userNumberText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    userId: {
        fontSize: 12,
        color: '#007AFF',
        marginBottom: 2,
        fontWeight: '500',
    },
    userDate: {
        fontSize: 12,
        color: '#666',
    },
    userActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        minWidth: 60,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#FFA500',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#bbb',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: Platform.OS === 'web' ? '400px' : '80%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#333',
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        gap: 10,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#8E8E93',
    },
    saveButton: {
        backgroundColor: '#007AFF',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});