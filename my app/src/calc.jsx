import { useState } from 'react';
import './calc.css';

function Calc() {
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');
  const [resultado, setResultado] = useState('');
  const [operador, setOperador] = useState('');
  const [campoAtivo, setCampoAtivo] = useState('valor1');

  const operadores = [
    { label: '+', value: '+' },
    { label: '-', value: '-' },
    { label: '×', value: '*' },
    { label: '÷', value: '/' },
    { label: '√', value: 'raiz' },
    { label: '^', value: 'potencia' },
    { label: '!', value: 'fatorial' },
    { label: '%', value: 'porcento' },
  ];

  const inserirNumero = (num) => {
    if (campoAtivo === 'valor1') {
      setValor1((prev) => prev + num);
    } else {
      setValor2((prev) => prev + num);
    }
  };

  const calcular = (op) => {
    const num1 = parseFloat(valor1);
    const num2 = parseFloat(valor2);
    setOperador(op);
    let res = '';

    if (isNaN(num1) && !['fatorial', 'raiz'].includes(op)) {
      setResultado('Valor 1 inválido');
      return;
    }

    switch (op) {
      case '+': res = num1 + num2; break;
      case '-': res = num1 - num2; break;
      case '*': res = num1 * num2; break;
      case '/': res = num2 !== 0 ? num1 / num2 : 'Erro: divisão por zero'; break;
      case 'raiz': res = Math.sqrt(num1); break;
      case 'potencia': res = Math.pow(num1, num2); break;
      case 'fatorial': res = fatorial(num1); break;
      case 'porcento': res = (num1 * num2) / 100; break;
      default: res = 'Operação inválida';
    }

    setResultado(res);
  };

  const fatorial = (n) => {
    if (n < 0 || isNaN(n)) return 'Inválido';
    let fat = 1;
    for (let i = 2; i <= n; i++) fat *= i;
    return fat;
  };

  const limpar = () => {
    setValor1('');
    setValor2('');
    setResultado('');
    setOperador('');
  };

  const desativaValor2 = ['fatorial', 'raiz'].includes(operador);

  return (
    <div id="calculadora" className="calc-container">
      <h1>🧮 Calculadora</h1>

      <div className="inputs">
        <input
          type="text"
          value={valor1}
          placeholder="Valor 1"
          onFocus={() => setCampoAtivo('valor1')}
          readOnly
        />
        <input
          type="text"
          value={valor2}
          placeholder="Valor 2"
          disabled={desativaValor2}
          onFocus={() => setCampoAtivo('valor2')}
          readOnly
        />
      </div>

      <div className="numeric-pad">
        {[1,2,3,4,5,6,7,8,9,0,'.'].map((num) => (
          <button key={num} onClick={() => inserirNumero(num.toString())}>
            {num}
          </button>
        ))}
        <button onClick={() => {
          if (campoAtivo === 'valor1') {
            setValor1((prev) => prev.slice(0, -1));
          } else {
            setValor2((prev) => prev.slice(0, -1));
          }
        }}>⌫</button>
      </div>

      <div className="buttons-grid">
        {operadores.map(op => (
          <button key={op.value} onClick={() => calcular(op.value)}>
            {op.label}
          </button>
        ))}
      </div>

      <div className="result-area">
        <p>Resultado: <strong>{resultado}</strong></p>
        <button className="clear-btn" onClick={limpar}>Limpar</button>
      </div>
    </div>
  );
}

export default Calc;
