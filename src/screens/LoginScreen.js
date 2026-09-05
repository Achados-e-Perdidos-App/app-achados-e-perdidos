import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';

const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
});

export default function Login() {
    const navigation = useNavigation();
    const { signIn } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const submit = async (values) => {
        setLoading(true);
        const result = await signIn(values.email, values.password);
        setLoading(false);
        if (!result.success) {
            Alert.alert('Erro ao entrar', result.error);
        } else {
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
        }
    };

    return (
        <LinearGradient colors={['#4F46E5', '#7C3AED']} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.flex}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.header}>
                            <Text style={styles.brand}>Bem-Vindo de Volta!</Text>
                            <Text style={styles.subtitle}>
                                Faça login para continuar usando o aplicativo.
                            </Text>
                        </View>

                        <View style={styles.card}>
                            <Formik
                                validationSchema={loginValidationSchema}
                                initialValues={{ email: '', password: '' }}
                                onSubmit={submit}
                            >
                                {({
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    values,
                                    errors,
                                    touched,
                                    isValid,
                                }) => (
                                    <>
                                        <Text style={styles.label}>Email</Text>
                                        <View
                                            style={[
                                                styles.inputContainer,
                                                touched.email && errors.email && styles.inputError,
                                            ]}
                                        >
                                            <Icon name="mail-outline" size={20} color="#8B8B9E" style={styles.icon} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Digite seu email: Ex: nome@gmail.com"
                                                placeholderTextColor="#B0B0C0"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                            />
                                        </View>
                                        {touched.email && errors.email && (
                                            <Text style={styles.errorText}>{errors.email}</Text>
                                        )}

                                        <Text style={styles.label}>Senha</Text>
                                        <View
                                            style={[
                                                styles.inputContainer,
                                                touched.password && errors.password && styles.inputError,
                                            ]}
                                        >
                                            <Icon name="lock-closed-outline" size={20} color="#8B8B9E" style={styles.icon} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Digite sua senha: Ex: 123456"
                                                placeholderTextColor="#B0B0C0"
                                                secureTextEntry
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                            />
                                        </View>
                                        {touched.password && errors.password && (
                                            <Text style={styles.errorText}>{errors.password}</Text>
                                        )}

                                        <TouchableOpacity
                                            style={[styles.button, (!isValid || loading) && styles.buttonDisabled]}
                                            onPress={handleSubmit}
                                            disabled={!isValid || loading}
                                            activeOpacity={0.85}
                                        >
                                            <Text style={styles.buttonText}>
                                                {loading ? 'Entrando...' : 'Entrar'}
                                            </Text>
                                            {!loading && (
                                                <Icon name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
                                            )}
                                        </TouchableOpacity>

                                        <View style={styles.dividerRow}>
                                            <View style={styles.divider} />
                                            <Text style={styles.dividerText}>ou</Text>
                                            <View style={styles.divider} />
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Cadastro')}
                                            style={styles.signUpWrapper}
                                        >
                                            <Text style={styles.signUp}>
                                                Não tem uma conta? <Text style={styles.signUpLink}>Cadastre-se</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </Formik>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 28,
    },
    logoCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    brand: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#E6E1FF',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4B4B5A',
        marginBottom: 6,
        marginTop: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 52,
        backgroundColor: '#F5F5F9',
        borderRadius: 12,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#F5F5F9',
    },
    inputError: {
        borderColor: '#EF4444',
        backgroundColor: '#FEF2F2',
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 15,
        color: '#1F1F2E',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
    },
    forgotWrapper: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    forgotPassword: {
        fontSize: 13,
        color: '#4F46E5',
        fontWeight: '600',
    },
    button: {
        flexDirection: 'row',
        width: '100%',
        height: 52,
        backgroundColor: '#4F46E5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonDisabled: {
        backgroundColor: '#B4B0F0',
        shadowOpacity: 0,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5EF',
    },
    dividerText: {
        marginHorizontal: 12,
        fontSize: 12,
        color: '#A0A0B0',
    },
    signUpWrapper: {
        alignItems: 'center',
    },
    signUp: {
        fontSize: 14,
        color: '#6B6B7B',
    },
    signUpLink: {
        color: '#4F46E5',
        fontWeight: '700',
    },
});