class Product {
    constructor() {
        this.id = 1;
        this.productList = [];
        this.editId = null;
    }

    readData() {
        let product = {}
        //pegar os valores dos forms
        product.id = this.id;
        product.name = document.querySelector('#itemName').value;
        product.price = document.querySelector('#itemPrice').value;
        product.quantity = document.querySelector('#itemQuantity').value;
        product.totalPrice = product.price * product.quantity;

        return product;
    }

    registerProduct() {
        let product = this.readData();

        //validar se não possui campos de dado em branco
        if (this, this.validateInfos(product)) {
            //validar se o id é nulo (produto novo)
            if (this.editId == null) {
                //adicionar um produto
                this.productList.push(product);
                this.id++;
            }
            else {
                //editar o produto
                this.changeProduct(this.editId, product);
            }

        }

        this.listTable();
        this.cleanFields();
        this.refreshTotalPrice();
    }

    removeProduct(id) {
        if (confirm('Tem certeza que seja deletar permanentemente este item?')) {
            let tbody = document.getElementById('tbody');

            for (let index = 0; index < this, this.productList.length; index++) {
                if (this.productList[index].id == id) {
                    this.productList.splice(index, 1); //deletar do array
                    tbody.deleteRow(index); //deletar do td
                    this.refreshTotalPrice();
                }
            }
        }
    }

    editProduct(params) {
        //metodo para chamar a opção de editar o produto
        this.editId = params.id;
        document.querySelector('#itemName').value = params.name;
        document.querySelector('#itemPrice').value = params.price;
        document.querySelector('#itemQuantity').value = params.quantity;
        //mudar o value do botao
        document.getElementById('btn-add').innerText = 'Atualizar produto';
    }

    changeProduct(id, product) {
        for (let index = 0; index < this.productList.length; index++) {
            //atualizar os dados do produto
            if (this.productList[index].id == id) {
                this.productList[index].name = product.name;
                this.productList[index].price = product.price;
                this.productList[index].quantity = product.quantity;
                this.productList[index].totalPrice = product.totalPrice;

            }

        }
    }

    validateInfos(product) {
        let messageError = '';

        if (product.name == '') {
            messageError += 'Nome do produto não informado \n';
        }

        if (product.price == '') {
            messageError += 'Preço do produto não informado \n';
        }

        if (product.quantity == '') {
            messageError += 'Quantidade do produto não informada \n';
        }

        if (messageError != '') {
            alert(messageError);
            return false;
        }

        return true;

    }

    cleanFields() {
        document.querySelector('#itemName').value = '';
        document.querySelector('#itemPrice').value = '';
        document.querySelector('#itemQuantity').value = '';
        document.getElementById('btn-add').innerText = 'Adicionar';
        this.editId = null;
    }

    refreshTotalPrice() {
        let total = 0;
        document.querySelector('#itemTotal').innerText = '';

        for (let index = 0; index < this.productList.length; index++) {

            total += this.productList[index].totalPrice;
        }

        document.querySelector('#itemTotal').innerHTML = `R$ ${total}`;
    }

    listTable() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let index = 0; index < this.productList.length; index++) {

            //inserir linhas da tabela
            let tr = tbody.insertRow();
            let td_id = tr.insertCell();
            let td_name = tr.insertCell();
            let td_price = tr.insertCell();
            let td_action = tr.insertCell();
            //inserir valores nas linhas da tabela
            td_id.innerText = this.productList[index].id;
            td_name.innerText = this.productList[index].name;
            td_price.innerText = `R$ ${this.productList[index].totalPrice}`;
            //criando e inserindo imagens de ações
            let imgDelete = document.createElement('img');
            let imgEdit = document.createElement('img');
            imgEdit.src = '/img/file-edit-alt.svg';
            //relacionando imagem de EDIT com evento de clique
            imgEdit.setAttribute("onclick", "product.editProduct(" + JSON.stringify(this.productList[index]) + ")");

            imgDelete.src = '/img/trash-alt.svg';
            //relacionando imagem de DELETE com evento de clique
            imgDelete.setAttribute("onclick", "product.removeProduct(" + this.productList[index].id + ")");

            td_action.appendChild(imgEdit);
            td_action.appendChild(imgDelete);

        }
    }
}

var product = new Product();