import './Modal.css';
import { format } from 'date-fns';

interface Detetive {
    _id: string;
    nome: string;
    tipo: string;
    patente: string;
    especialidade: string;
}

interface Suspeito {
    _id: string;
    nome: string;
    alibi: string;
    relacaoComVitima: string;
    casoCriminal: string;
    grauSuspeito: string;
    descricaoFisica: string;
}

interface Testemunha {
    _id: string;
    nome: string;
    relacaoComVitima: string;
    confiabilidade: string;
    tipoTestemunha: string;
}

interface Evidencia {
    _id: string;
    descricao: string;
    localizacao: string;
    tipoEvidencia: string;
    statusEvidencia: string;
    casoCriminal: string;
    dataEncontro: string;
}

interface Entrevista {
    _id: string;
    entrevistado: string;
    tipoEntrevistado: string;
    tipoEntrevista: string;
    localEntrevista: string;
    casoCriminal: string;
    motivoEntrevista: string;
    nomeResponsavel: string;
    ataEntrevista: string;
    dataHoraInicio: string;
    dataHoraFim: string;
}

interface CasoCriminal {
    _id: string;
    nomeVitima: string;
    descricaoCrime: string;
    tipoCrime: string;
    dataAbertura: string;
    dataFechamento: string;
    statusCaso: string;
    suspeitos: Suspeito[];
    testemunhas: Testemunha[];
    detetives: Detetive[];
    evidencias: Evidencia[];
    entrevistas: Entrevista[];
}

interface ModalProps {
    isOpen: boolean;
    entrevista: Entrevista | null;
    casoCriminal: CasoCriminal | null;
    onClose: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => Promise<void>;
}

const ModalEntrevista: React.FC<ModalProps> = ({ isOpen, entrevista, casoCriminal, onClose, onEdit, onDelete }) => {
    if (!isOpen || !entrevista) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>&times;</span>

                {casoCriminal ? (
                    <div className="modal-section">
                        <h3>Informações do Caso</h3>
                        <div>
                            <label>Descrição do Caso Criminal:</label>
                            <p>{casoCriminal.descricaoCrime}</p>
                        </div>
                        <div>
                            <label>Nome da vítima:</label>
                            <p>{casoCriminal.nomeVitima}</p>
                        </div>
                        <div>
                            <label>Tipo de crime:</label>
                            <p>{casoCriminal.tipoCrime}</p>
                        </div>
                        <div>
                            <label>Status do caso:</label>
                            <p>{casoCriminal.statusCaso}</p>
                        </div>
                        <div>
                            <label>Data do BO:</label>
                            <p>{casoCriminal.dataAbertura ? format(new Date(casoCriminal.dataAbertura), 'dd/MM/yyyy HH:mm') : ""}</p>
                        </div>
                    </div>
                ) : (
                    <p><strong>Caso Criminal:</strong> Detalhes não encontrados.</p>
                )}

                <div className="modal-section">
                    <h3>Informações da Entrevista</h3>
                    <div>
                        <label>Motivo da Entrevista:</label>
                        <p>{entrevista.motivoEntrevista}</p>
                    </div>
                    <div>
                        <label>Entrevistado:</label>
                        <p>{entrevista.entrevistado}</p>
                    </div>
                    <div>
                        <label>Responsável:</label>
                        <p>{entrevista.nomeResponsavel}</p>
                    </div>
                    <div>
                        <label>Data e Hora de Início:</label>
                        <p>{format(new Date(entrevista.dataHoraInicio), 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                </div>

                <div className="modal-actions">
                    <button onClick={() => onEdit(entrevista._id)}>Editar</button>
                    <button onClick={() => onDelete(entrevista._id)}>Excluir</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEntrevista;
