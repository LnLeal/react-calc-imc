import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/gridItem';
import  leftArrowImage  from './assets/leftarrow.png'

const App = () => {
  const [heighField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }
  const handleCalculateButton = () => {
    if(heighField && weightField) {
      setToShow(calculateImc(heighField, weightField));
    }
    else {
      alert("Digite todos os campos!");
    }
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>

      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa</p>
        
          <input
            type='number'
            placeholder='Digite a sua altura. Ex: 1,7 (em metros)'
            value={heighField > 0 ? heighField : ""}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
            />
            <input
            type='number'
            placeholder='Digite o seu peso. Ex: 65 (em kg)'
            value={weightField > 0 ? weightField : ""}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
            />

            <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
        <div className={styles.grid}>
          {levels.map((item, key) =>(
            <GridItem key={key} item={item}/>
          ))}
        </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton} >
                <img src={leftArrowImage} alt="" width={25} />
              </div>  
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
