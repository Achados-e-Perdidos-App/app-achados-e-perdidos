[README.md](https://github.com/user-attachments/files/31812891/README.md)
# 📦 Achados e Perdidos — App Acadêmico

Aplicativo mobile desenvolvido em **React Native (Expo)** para gerenciamento de itens
achados e perdidos dentro do ambiente escolar/acadêmico. O objetivo é permitir que
alunos e funcionários publiquem itens encontrados no campus, facilitando a
recuperação por parte dos donos.

---

## 🎯 Sobre o Projeto

O app permite:

- Publicação de itens encontrados no campus (com foto, local e data).
- Busca de itens por nome ou local no feed principal.
- Marcação de status do item: **Perdido** ou **Devolvido ao Dono**.
- Cadastro e login de usuários (alunos/funcionários) com e-mail institucional.

### Cadastros principais

| Entidade | Campos |
|---|---|
| **Usuário** | Matrícula, e-mail institucional, senha |
| **Item Perdido** | Título, foto, local onde foi encontrado, data, status (Perdido / Devolvido) |

---

## 👥 Divisão do Grupo

| Integrante | Responsabilidade |
|---|---|
| **Integrante 1** | Login/Cadastro e validação do e-mail institucional |
| **Integrante 2** | Formulário de publicação do item (foto + local) |
| **Integrante 3** | Feed com busca por nome/local e marcação de item "Devolvido ao Dono" |

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/) (Native Stack + Bottom Tabs)
- [Axios](https://axios-http.com/) — requisições HTTP
- [React Native Picker](https://github.com/react-native-picker/picker) — seleção de opções (ex: status do item)
- [React Native Community Slider](https://github.com/callstack/react-native-slider)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- Suporte web via `react-native-web`

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npx expo`)
- [Android Studio](https://developer.android.com/studio) (opcional, apenas para quem for rodar o app em emulador Android via build nativo)

---

## 🚀 Instalação

### Dependências específicas do projeto

Caso precise reinstalar ou configurar as dependências manualmente, execute os comandos abaixo na raiz do projeto:

```bash
# Comandos para iniciar o projeto clonado
npm install
rm -Force -Recurse node_modules, package-lock.json 



# Suporte a Web
npx expo install react-native-web react-dom @expo/metro-runtime

# Componentes de UI
npm install @react-native-picker/picker
npm install @react-native-community/slider
npm install react-native-vector-icons

# Requisições HTTP
npm install axios

# Navegação
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs

# Apenas para quem for abrir o projeto no Android Studio
npx expo install expo-build-properties
```

> ⚠️ **Atenção:** o pacote correto de requisições HTTP é `axios` (não `axio`). Certifique-se de instalar com o nome correto: `npm install axios`.

---

## ▶️ Como Executar

Inicie o servidor de desenvolvimento do Expo:

```bash
npx expo start
```

A partir do terminal/navegador que abrir, você pode:

- Pressionar `a` para abrir no emulador Android
- Pressionar `w` para abrir no navegador (web)
- Escanear o QR Code com o app **Expo Go** no celular

### Rodando no Android Studio (opcional)

Se for compilar/rodar via Android Studio, certifique-se de ter instalado o pacote `expo-build-properties` e gerado os arquivos nativos:

```bash
npx expo prebuild
npx expo run:android
```

---

## ✅ Funcionalidades (Roadmap)

- [ ] Cadastro e login com validação de e-mail institucional
- [ ] Formulário de publicação de item (foto, local, data)
- [ ] Feed de itens com busca por nome/local
- [ ] Marcação de item como "Devolvido ao Dono"
- [ ] Filtro por status (Perdido / Devolvido)
- [ ] Perfil do usuário

---
