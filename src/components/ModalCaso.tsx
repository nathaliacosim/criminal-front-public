import React from 'react';
import { format } from 'date-fns';
import './Modal.css';

interface Detetive {
    nome: string;
    tipo: string;
    patente: string;
    especialidade: string;
}

interface Suspeito {
    nome: string;
    alibi: string;
    relacaoComVitima: string;
    casoCriminal: string;
}

interface Testemunha {
    nome: string;
    relacaoComVitima: string;
    confiabilidade: string;
    tipoTestemunha: string;
}

interface Evidencia {
    descricao: string;
    localizacao: string;
    tipoEvidencia: string;
    statusEvidencia: string;
}

interface Entrevista {
    motivoEntrevista: string;
    entrevistado: string;
    dataHoraInicio: string;
    nomeResponsavel: string;
}

interface Caso {
    _id: string;
    nomeVitima: string;
    detetives: Detetive[];
    statusCaso: string;
    tipoCrime: string;
    dataAbertura: string;
    dataFechamento?: string;
    suspeitos: Suspeito[];
    testemunhas: Testemunha[];
    evidencias: Evidencia[];
    entrevistas: Entrevista[];
}

interface ModalProps {
    isOpen: boolean;
    caso: Caso;
    onClose: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, caso, onClose, onEdit, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>&times;</span>
                <h3>Detalhes do Caso Criminal</h3>

                <section className="modal-section">
                    <label><strong>Vítima:</strong></label>
                    <p>{caso.nomeVitima}</p>
                </section>

                <section className="modal-section">
                    <label><strong>Responsáveis:</strong></label>
                    <p>
                        {caso.detetives.map((detetive, index) => (
                            <React.Fragment key={index}>
                                <strong>Nome:</strong> {detetive.nome} <br />
                                <strong>Tipo:</strong> {detetive.tipo} <br />
                                <strong>Patente:</strong> {detetive.patente} <br />
                                <strong>Especialidade:</strong> {detetive.especialidade} <br />
                                {index !== caso.detetives.length - 1 && <><br /></>}
                            </React.Fragment>
                        ))}
                    </p>
                </section>

                <section className="modal-section">
                    <label><strong>Status:</strong></label>
                    <p>{caso.statusCaso}</p>
                </section>

                <section className="modal-section">
                    <label><strong>Tipo de Crime:</strong></label>
                    <p>{caso.tipoCrime}</p>
                </section>

                <section className="modal-section">
                    <label><strong>Data de Abertura:</strong></label>
                    <p>{format(new Date(caso.dataAbertura), 'dd/MM/yyyy HH:mm')}</p>
                </section>

                <section className="modal-section">
                    <label><strong>Data de Encerramento:</strong></label>
                    <p>{caso.dataFechamento ? format(new Date(caso.dataFechamento), 'dd/MM/yyyy HH:mm') : "Não Encerrado."}</p>
                </section>

                <section className="modal-section">
                    <label><strong>Suspeito(s):</strong></label>
                    <p>
                        {caso.suspeitos.map((suspeito, index) => (
                            <React.Fragment key={index}>
                                <strong>Nome:</strong> {suspeito.nome} <br />
                                <strong>Relação com a Vítima:</strong> {suspeito.relacaoComVitima} <br />
                                <strong>Álibi:</strong> {suspeito.alibi} <br />
                                {index !== caso.suspeitos.length - 1 && <><br /></>}
                            </React.Fragment>
                        ))}
                    </p>
                </section>

                <section className="modal-section">
                    <label><strong>Testemunha(s):</strong></label>
                    <p>
                        {caso.testemunhas.map((testemunha, index) => (
                            <React.Fragment key={index}>
                                <strong>Nome:</strong> {testemunha.nome} <br />
                                <strong>Relação com a Vítima:</strong> {testemunha.relacaoComVitima} <br />
                                <strong>Tipo:</strong> {testemunha.tipoTestemunha} <br />
                                <strong>Confiabilidade:</strong> {testemunha.confiabilidade} <br />
                                {index !== caso.testemunhas.length - 1 && <><br /></>}
                            </React.Fragment>
                        ))}
                    </p>
                </section>

                <section className="modal-section">
                    <label><strong>Evidência(s):</strong></label>
                    <p>
                        {caso.evidencias.map((evidencia, index) => (
                            <React.Fragment key={index}>
                                <strong>Tipo:</strong> {evidencia.tipoEvidencia} <br />
                                <strong>Descrição:</strong> {evidencia.descricao} <br />
                                <strong>Localização:</strong> {evidencia.localizacao} <br />
                                {index !== caso.evidencias.length - 1 && <><br /></>}
                            </React.Fragment>
                        ))}
                    </p>
                </section>

                <section className="modal-section">
                    <label><strong>Entrevista(s)</strong></label>
                    <p>
                        {caso.entrevistas.map((entrevista, index) => (
                            <React.Fragment key={index}>
                                <strong>Motivo:</strong> {entrevista.motivoEntrevista} <br />
                                <strong>Entrevistado:</strong> {entrevista.entrevistado} <br />
                                <strong>Responsável:</strong> {entrevista.nomeResponsavel} <br />
                                <strong>Data:</strong> {format(new Date(entrevista.dataHoraInicio), 'dd/MM/yyyy HH:mm')} <br />
                                {index !== caso.entrevistas.length - 1 && <><br /></>}
                            </React.Fragment>
                        ))}
                    </p>
                </section>

                <div className="modal-actions">
                    <button onClick={() => onEdit(caso._id)}>Editar</button>
                    <button onClick={() => onDelete(caso._id)}>Excluir</button>
                </div>
            </div >
        </div >
    );
};

export default Modal;
