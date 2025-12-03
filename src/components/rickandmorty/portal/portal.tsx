import './fullscene.css';

interface PortalProps {
  onNavigate: () => void;
}

export function Portal({ onNavigate }: PortalProps) {
  return (
    <div className="portal-container">
      <div className="container">
        {/* Portal com animação */}
        <div className="portal"></div>
        <div className="portal-bubbles"></div>

        {/* Title com letras individuais */}
        <div className="title bottom">
          <span><i>R</i></span>
          <span><i>i</i></span>
          <span><i>c</i></span>
          <span><i>k</i></span>
          <span><i>a</i></span>
          <span><i>n</i></span>
          <span><i>d</i></span>
          <span><i>M</i></span>
          <span><i>o</i></span>
          <span><i>r</i></span>
          <span><i>t</i></span>
          <span><i>y</i></span>
        </div>
        <div className="title middle">
          <span><i>R</i></span>
          <span><i>i</i></span>
          <span><i>c</i></span>
          <span><i>k</i></span>
          <span><i>a</i></span>
          <span><i>n</i></span>
          <span><i>d</i></span>
          <span><i>M</i></span>
          <span><i>o</i></span>
          <span><i>r</i></span>
          <span><i>t</i></span>
          <span><i>y</i></span>
        </div>
        <div className="title">
          <span><i>R</i></span>
          <span><i>i</i></span>
          <span><i>c</i></span>
          <span><i>k</i></span>
          <span><i>a</i></span>
          <span><i>n</i></span>
          <span><i>d</i></span>
          <span><i>M</i></span>
          <span><i>o</i></span>
          <span><i>r</i></span>
          <span><i>t</i></span>
          <span><i>y</i></span>
        </div>
      </div>

      {/* Botão ver personagens */}
      <button className="portal-button" onClick={onNavigate} aria-label="Ver personagens">
        See Characters
      </button>
    </div>
  );
}