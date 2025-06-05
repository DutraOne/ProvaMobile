import axios from "axios";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";

export default function CepSearchScreen() {
  const [cep, setCep] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCepData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setError("CEP não encontrado.");
        setData(null);
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError("Erro ao buscar o CEP.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite o CEP:</Text>

      <TextInput
        style={styles.input}
        placeholder="00000-000"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={9}
      />

      <TouchableOpacity style={styles.button} onPress={fetchCepData}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#3A9D8A" />}

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        data && (
          <View style={styles.result}>
            <Text>Rua: {data.logradouro || "N/A"}</Text>
            <Text>Bairro: {data.bairro || "N/A"}</Text>
            <Text>Cidade: {data.localidade}</Text>
            <Text>Estado: {data.uf}</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3A9D8A",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
  },
  errorText: {
    marginTop: 20,
    color: "red",
  },
});
