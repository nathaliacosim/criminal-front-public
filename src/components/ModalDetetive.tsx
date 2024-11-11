import React from "react";
import './Modal.css';

interface Detetive {
    _id: string;
    nome: string;
    tipo: string;
    patente: string;
    especialidade: string;
}

interface ModalProps {
    isOpen: boolean;
    detetive: Detetive | null;
    onClose: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => Promise<void>;
}

const ModalDetetive: React.FC<ModalProps> = ({ isOpen, detetive, onClose, onEdit, onDelete }) => {
    if (!isOpen || !detetive) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>&times;</span>

                {/* Informações do Detetive */}
                <div className="modal-section">
                    <h3>Informações do Detetive</h3>
                    <div>
                        <label>Nome:</label>
                        <p>{detetive.nome}</p>
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <p>{detetive.tipo}</p>
                    </div>
                    <div>
                        <label>Patente:</label>
                        <p>{detetive.patente}</p>
                    </div>
                    <div>
                        <label>Especialidade:</label>
                        <p>{detetive.especialidade}</p>
                    </div>
                </div>

                <div className="modal-actions">
                    <button onClick={() => onEdit(detetive._id)}>Editar</button>
                    <button onClick={() => onDelete(detetive._id)}>Excluir</button>
                </div>
            </div>
        </div>
    );
}

export default ModalDetetive;
