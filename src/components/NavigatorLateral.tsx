import { Link } from "react-router-dom";
import Justice from "../assets/asset_principal.png";
import "./NavigatorLateral.css";

const NavigatorLateral = () => {
  return (
    <div className="navigator-lateral b-dark-blue">
      <img className="imagem-logo" src={Justice} alt="Justice"></img>
      <h2 className="league-spartan f-white">Criminal Front</h2>
      <br />
      <ul>
        <li>
          <Link to="/casos-criminais">Casos Criminais</Link>
        </li>
        <li>
          <Link to="/suspeitos">Suspeitos</Link>
        </li>
        <li>
          <Link to="/detetives">Detetives</Link>
        </li>
        <li>
          <Link to="/testemunhas">Testemunhas</Link>
        </li>
        <li>
          <Link to="/evidencias">Evidências</Link>
        </li>
        <li>
          <Link to="/entrevistas">Entrevistas</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigatorLateral;
