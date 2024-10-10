const int pinoSensor = 26;  // Pino GPIO 26 do ESP32
unsigned long tempoAnterior = 0;  // Armazena o tempo anterior
unsigned long intervalo = 1000;  // Intervalo de 1 segundo
int segundos = 0;  // Contador de segundos

void setup() {
  pinMode(pinoSensor, INPUT_PULLUP);  // Configura o pino do sensor como entrada com pull-up
  Serial.begin(115200);  // Inicializa a comunicação serial com a taxa de 115200 baud
}

void loop() {
  int estadoSensor = digitalRead(pinoSensor);  // Lê o estado do sensor

  // Verifica se o sinal do sensor está LOW (chuveiro ligado)
  if (estadoSensor == LOW) {
    unsigned long tempoAtual = millis();  // Obtém o tempo atual

    // Verifica se já passou 1 segundo
    if (tempoAtual - tempoAnterior >= intervalo) {
      tempoAnterior = tempoAtual;  // Atualiza o tempo anterior
      segundos++;  // Incrementa o contador de segundos

      // Exibe o tempo que o chuveiro esteve em uso no monitor serial
      Serial.print("Chuveiro ligado por: ");
      Serial.print(segundos);
      Serial.println(" segundos");
    }
  } else {
    // Quando o sensor não está ativado (sinal HIGH), reinicia o contador de tempo
    segundos = 0;
  }
}