export interface Chamado {
	id?: any;
	dataAbertura?: string;
	dataFechamento?: string;
	status: string;
	titulo: string;
	prioridade: string;
	nomeTecnico: string;
	nomeCliente: string;
    observacoes: string;
	tecnico: any;
	cliente: any;
}
