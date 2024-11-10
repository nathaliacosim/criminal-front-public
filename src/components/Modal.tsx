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
                <button className="modal-close" onClick={onClose}>X</button>
                <h3>Detalhes do Caso Criminal</h3>
                <br />

                <label>
                    <strong>Vítima:</strong>
                    <p className='text-small'>
                        {caso.nomeVitima}
                    </p>
                </label>

                <label>
                    <strong>Responsável:</strong>
                    <p className='text-small'>
                        {caso.detetives.map(detetive => `(${detetive.tipo}) ${detetive.nome} - ${detetive.especialidade} | ${detetive.patente}`).join(', ')}
                    </p>
                </label>

                <label>
                    <strong>Status:</strong>
                    <p className='text-small'>
                        {caso.statusCaso}
                    </p>
                </label>

                <label>
                    <strong>Tipo de Crime:</strong>
                    <p className='text-small'>
                        {caso.tipoCrime}
                    </p>
                </label>

                <label>
                    <strong>Data de Abertura do Caso:</strong>
                    <p className='text-small'>
                        {format(new Date(caso.dataAbertura), 'dd/MM/yyyy HH:mm')}
                    </p>
                </label>

                <label>
                    <strong>Data de Encerramento do Caso:</strong>
                    <p className='text-small'>
                        {caso.dataFechamento ? format(new Date(caso.dataFechamento), 'dd/MM/yyyy HH:mm') : "Não Encerrado."}
                    </p>
                </label>

                <label>
                    <strong>Suspeito(s):</strong>
                    <p className='text-small'>
                        {caso.suspeitos.map(suspeito => `(${suspeito.relacaoComVitima}) ${suspeito.nome} | Alibi: ${suspeito.alibi}`).join(', ')}
                    </p>
                </label>

                <label>
                    <strong>Testemunha(s):</strong>
                    <p className='text-small'>
                        {caso.testemunhas.map(testemunhas => `(${testemunhas.relacaoComVitima}) ${testemunhas.nome} | Tipo de Testemunha: ${testemunhas.tipoTestemunha} - Confiabilidade: ${testemunhas.confiabilidade}`).join(', ')}
                    </p>
                </label>

                <label>
                    <strong>Evidência(s):</strong>
                    <p className='text-small'>
                        {caso.evidencias.map(evidencias => `(${evidencias.tipoEvidencia}) ${evidencias.descricao} | Situação da Ev.: ${evidencias.statusEvidencia} | Localizada: ${evidencias.localizacao}`).join(', ')}
                    </p>
                </label>

                <label>
                    <strong>Entrevista(s):</strong>
                    <p className='text-small'>
                        {caso.entrevistas.map((entrevista) => {
                            const dataFormatada = format(new Date(entrevista.dataHoraInicio), 'dd/MM/yyyy HH:mm');
                            return `(${entrevista.motivoEntrevista}) Entrevistado: ${entrevista.entrevistado} | Responsável: ${entrevista.nomeResponsavel} | Data: ${dataFormatada}`;
                        }).join(', ')}
                    </p>
                </label>


                <div className="modal-actions">
                    <button onClick={() => onEdit(caso._id)}>Editar</button>
                    <button onClick={() => onDelete(caso._id)}>Excluir</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
