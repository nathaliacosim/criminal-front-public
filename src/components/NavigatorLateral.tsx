import { Link } from "react-router-dom";
import "./NavigatorLateral.css";

const NavigatorLateral = () => {
  return (
    <div className="navigator-lateral">
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
