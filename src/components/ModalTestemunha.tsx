import React from "react";
import { format } from "date-fns";
import './Modal.css';

interface Testemunha {
    _id: string;
    nome: string;
    dataNascimento: string;
    endereco: string;
    tipoTestemunha: string;
    alibi: string;
    relacaoComVitima: string;
    depoimento: string;
    confiabilidade: string;
    casoCriminal: string;
    __v?: number;
}

interface CasoCriminal {
    _id: string;
    nomeVitima: string;
    descricaoCrime: string;
    tipoCrime: string;
    dataAbertura: string;
    dataFechamento: string;
    statusCaso: string;
}

interface ModalProps {
    isOpen: boolean;
    testemunha: Testemunha | null;
    casoCriminal: CasoCriminal | null;
    onClose: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => Promise<void>;
}

const ModalTestemunha: React.FC<ModalProps> = ({ isOpen, testemunha, casoCriminal, onClose, onEdit, onDelete }) => {
    if (!isOpen || !testemunha) return null;

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
                            <label>Nome da Vítima:</label>
                            <p>{casoCriminal.nomeVitima}</p>
                        </div>
                        <div>
                            <label>Tipo de Crime:</label>
                            <p>{casoCriminal.tipoCrime}</p>
                        </div>
                        <div>
                            <label>Status do Caso:</label>
                            <p>{casoCriminal.statusCaso}</p>
                        </div>
                        <div>
                            <label>Data de Abertura:</label>
                            <p>{casoCriminal.dataAbertura ? format(new Date(casoCriminal.dataAbertura), 'dd/MM/yyyy HH:mm') : ""}</p>
                        </div>
                    </div>
                ) : (
                    <p><strong>Caso Criminal:</strong> Detalhes não encontrados.</p>
                )}

                {/* Informações da Testemunha */}
                <div className="modal-section">
                    <h3>Informações da Testemunha</h3>
                    <div>
                        <label>Nome:</label>
                        <p>{testemunha.nome}</p>
                    </div>
                    <div>
                        <label>Data de Nascimento:</label>
                        <p>{format(new Date(testemunha.dataNascimento), 'dd/MM/yyyy')}</p>
                    </div>
                    <div>
                        <label>Endereço:</label>
                        <p>{testemunha.endereco}</p>
                    </div>
                    <div>
                        <label>Tipo de Testemunha:</label>
                        <p>{testemunha.tipoTestemunha}</p>
                    </div>
                    <div>
                        <label>Álibi:</label>
                        <p>{testemunha.alibi}</p>
                    </div>
                    <div>
                        <label>Relação com a Vítima:</label>
                        <p>{testemunha.relacaoComVitima}</p>
                    </div>
                    <div>
                        <label>Depoimento:</label>
                        <p>{testemunha.depoimento}</p>
                    </div>
                    <div>
                        <label>Confiabilidade:</label>
                        <p>{testemunha.confiabilidade}</p>
                    </div>
                </div>

                {/* Ações */}
                <div className="modal-actions">
                    <button onClick={() => onEdit(testemunha._id)}>Editar</button>
                    <button onClick={() => onDelete(testemunha._id)}>Excluir</button>
                </div>
            </div>
        </div>
    );
}

export default ModalTestemunha;
