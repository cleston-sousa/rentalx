# cadastro de carro

**rf**
deve ser possivel cadastrar um novo carro

**rn**
nao deve ser possivel cadastrar um carro com uma placa ja existente
o carro deve ser cadastrado por padrao com disponibilidade
* o usuario responsavel pelo cadastro deve ser um adminitrador

# listagem de carros

**rf**
deve ser possivel listar todos os carros disponiveis
deve ser possivel listar todos os carros disponiveis pelo nome da categoria
deve ser possivel listar todos os carros disponiveis pelo nome da marca
deve ser possivel listar todos os carros disponiveis pelo nome do carro

**rn**
o usuario nao precisa estar logado no sistema

# cadastro de especificacao no carro

**rf**
deve ser possivel cadastrar uma especificacao para um carro
deve ser possivel listar todas as especificacoes
deve ser possivel listar todos os carros

**rn**
nao deve ser possivel cadastrar uma especificacao para um carro nao cadastrado
nao deve ser possivel cadastrar uma especificacao ja existente para o mesmo carro
* o usuario responsavel pelo cadastro deve ser um adminitrador

# cadasto de imgens do carro

**rf**
deve ser possivel cadastrar a imagem do carro
deve ser possivel listar todos os carros

**rnf**
utilizar o multer para upload

**rn**
o usuario deve poder cadastrar mais de uma imagem para o mesmo carro
* o usuario responsavel pelo cadastro deve ser um adminitrador

# aluguel de carro

**rf**
deve ser possivel cadastrar um aluguel

**rn**
o aluguel deve ter duracao minima de 24 horas
nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro
o usuario deve estar logado na aplicacao

# devolucao de carro

**rf**
deve ser possivel realizar a devolucao de um carro

**rn**
se o carro for devolvido com menos de 24 horas devera ser cobrado diaria completa
ao realizar a devolucao o carro devera ser liberado para outro aluguel
ao realizar a devolucao o usuario devera ser liberado para outro aluguel
ao realizar a devolucao devera ser calculado o valor do aluguel
caso o horario de devolucao seja superior ao horario previsto de entrega devera ser cobrada multa proporcional aos atraso
caso haja multa devera ser somado ao total do aluguel
