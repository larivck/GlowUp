
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

export default function App() {
  const [frase, setFrase] = useState('');
  const [autor, setAutor] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Função que consome a API
   
const buscarFrase = async () => {
  setCarregando(true);

  try {
    // 1. Buscar uma frase na API DummyJSON
    const resposta = await fetch(
      'https://dummyjson.com/quotes/random'
    );

    if (!resposta.ok) {
      throw new Error('Erro ao buscar frase');
    }

    const dados = await resposta.json();

    // 2. Preparar o texto para tradução
    const textoOriginal = dados.quote;

    const urlTraducao =
      'https://api.mymemory.translated.net/get' +
      '?q=' + encodeURIComponent(textoOriginal) +
      '&langpair=en|pt-BR';

    // 3. Enviar a frase para a API de tradução
    const respostaTraducao = await fetch(urlTraducao);

    if (!respostaTraducao.ok) {
      throw new Error('Erro na tradução');
    }

    const dadosTraducao = await respostaTraducao.json();

    // 4. Verificar se a tradução foi realizada
    if (
      dadosTraducao.responseStatus !== 200 ||
      !dadosTraducao.responseData?.translatedText
    ) {
      throw new Error('Tradução indisponível');
    }

    // 5. Exibir a frase traduzida
     
const fraseTraduzida = decodeURIComponent(
  dadosTraducao.responseData.translatedText
);

setFrase(fraseTraduzida);


    // 6. Manter o nome do autor
    setAutor(dados.author);

  } catch (erro) {
    console.log('Erro:', erro);

    Alert.alert(
      'Ops! 💗',
      'Não foi possível carregar a frase traduzida. Tente novamente.'
    );

  } finally {
    setCarregando(false);
  }
};


  // Busca uma frase quando o aplicativo abre
  useEffect(() => {
    buscarFrase();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFF5F8"
      />

      <ScrollView
        contentContainerStyle={styles.conteudo}
      >
        <Text style={styles.decoracao}>✿ ♡ ✿</Text>

        <Text style={styles.logo}>
          GlowUp
        </Text>

        <Text style={styles.subtitulo}>
          Seu cantinho de inspiração 🌷
        </Text>

        <View style={styles.card}>
          <Text style={styles.icone}>♡</Text>

          <Text style={styles.tituloCard}>
            Inspiração do dia
          </Text>

          <View style={styles.linha} />

          {carregando ? (
            <ActivityIndicator
              size="large"
              color="#D96C91"
            />
          ) : (
            <>
              <Text style={styles.frase}>
                "{frase}"
              </Text>

              <Text style={styles.autor}>
                — {autor}
              </Text>
            </>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.botao,
            carregando && styles.botaoDesativado,
          ]}
          onPress={buscarFrase}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            {carregando
              ? 'Carregando...'
              : '✦ Nova inspiração'}
          </Text>
        </TouchableOpacity>

        <View style={styles.mensagem}>
          <Text style={styles.mensagemTitulo}>
            Um lembrete para você 💕
          </Text>

          <Text style={styles.mensagemTexto}>
            Reserve um momento do seu dia para
            cuidar de si mesma e encontrar
            inspiração nas pequenas coisas.
          </Text>
        </View>

        <Text style={styles.rodape}>
          Feito com carinho ♡ GlowUp
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },

  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    paddingTop: 60,
    paddingBottom: 35,
  },

  decoracao: {
    fontSize: 25,
    color: '#D96C91',
    marginBottom: 10,
  },

  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#C75B82',
    letterSpacing: 1,
  },

  subtitulo: {
    fontSize: 15,
    color: '#A8788B',
    marginTop: 8,
    marginBottom: 35,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 28,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    elevation: 5,
    shadowColor: '#D96C91',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  icone: {
    fontSize: 45,
    color: '#D96C91',
    marginBottom: 10,
  },

  tituloCard: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#B84D75',
    textAlign: 'center',
  },

  linha: {
    width: 50,
    height: 3,
    backgroundColor: '#F5C6D6',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 25,
  },

  frase: {
    fontSize: 19,
    color: '#624D57',
    textAlign: 'center',
    lineHeight: 29,
    marginBottom: 20,
  },

  autor: {
    fontSize: 14,
    color: '#B77B92',
    fontStyle: 'italic',
    textAlign: 'center',
  },

  botao: {
    backgroundColor: '#D96C91',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  mensagem: {
    backgroundColor: '#FCE4EC',
    padding: 22,
    borderRadius: 20,
    width: '100%',
    marginTop: 35,
    alignItems: 'center',
  },

  mensagemTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B84D75',
    marginBottom: 10,
  },

  mensagemTexto: {
    fontSize: 14,
    color: '#8E6575',
    textAlign: 'center',
    lineHeight: 22,
  },

  rodape: {
    fontSize: 12,
    color: '#B98A9B',
    marginTop: 35,
  },
});
