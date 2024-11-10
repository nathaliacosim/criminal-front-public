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
}

interface Entrevista {
    _id: string;
    motivoEntrevista: string;
    entrevistado: string;
    dataHoraInicio: string;
    nomeResponsavel: string;
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
    suspeito: Suspeito | null;
    casoCriminal: CasoCriminal | null;
    onClose: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => Promise<void>;
}

const ModalSuspeito: React.FC<ModalProps> = ({ isOpen, suspeito, casoCriminal, onClose, onEdit, onDelete }) => {
    if (!isOpen || !suspeito) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>&times;</span>

                {/* Caso Criminal */}
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

                {/* Informações do Suspeito */}
                <div className="modal-section">
                    <h3>Informações do Suspeito</h3>
                    <div>
                        <label>Nome:</label>
                        <p>{suspeito.nome}</p>
                    </div>
                    <div>
                        <label>Descrição Física:</label>
                        <p>{suspeito.descricaoFisica}</p>
                    </div>
                    <div>
                        <label>Álibi:</label>
                        <p>{suspeito.alibi}</p>
                    </div>
                    <div>
                        <label>Relação com a vítima:</label>
                        <p>{suspeito.relacaoComVitima}</p>
                    </div>
                    <div>
                        <label>Grau do Suspeito:</label>
                        <p>{suspeito.grauSuspeito}</p>
                    </div>
                </div>

                {/* Ações */}
                <div className="modal-actions">
                    <button onClick={() => onEdit(suspeito._id)}>Editar</button>
                    <button onClick={() => onDelete(suspeito._id)}>Excluir</button>
                </div>
            </div>
        </div>
    );
}

export default ModalSuspeito;
