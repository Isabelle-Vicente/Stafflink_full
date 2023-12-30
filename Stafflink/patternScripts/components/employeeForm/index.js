import { stafflinkURL_employeePhoto } from "../../api/stafflink.js"
import { allUtils } from "../../main.js"

const stringForm = `
    <form>
        <div class="fieldsSection">
            <h3>Informações basicas</h3>

            <div class="field">
                <label for="name">Nome completo</label>
                <input type="text" name="name" id="name" required>
            </div>

            <div class="field small">
                <label for="birthday">Nascimento</label>
                <input type="date" name="birthday" id="birthday" required>
            </div>

            <div class="field small">
                <label for="age">Idade</label>
                <input type="number" name="age" id="age" disabled>
            </div>

            <div class="field small">
                <label for="genderIdentity">Identidade de gênero</label>
                
                <select name="genderIdentity" id="genderIdentity">
                    <option value="">Selecione uma opção</option>
                    <option value="não informado">Prefere não informar</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="transgênero">Transgênero</option>
                    <option value="gênero neutro">Gênero neutro</option>
                    <option value="não binário">Não binário</option>
                    <option value="agênero">Agênero</option>
                    <option value="pangênero">Pangênero</option>
                    <option value="outro">Outro</option>
                </select>
            </div>

            <div class="field small">
                <label for="pronoun">Pronome</label>
                <select name="pronoun" id="pronoun">
                    <option value="">Selecione uma opção</option>
                    <option value="não informado">Prefere não informar</option>
                    <option value="ele/dele">Ele/dele</option>
                    <option value="ela/dela">Ela/dela</option>
                    <option value="elu/delu">Elu/delu</option>
                    <option value="outro">Outro</option>
                </select>
            </div>

            <div class="field">
                <label for="motherName">Nome da mãe</label>
                <input type="text" name="motherName" id="motherName">
            </div>

            <div class="field">
                <label for="fatherName">Nome do pai</label>
                <input type="text" name="fatherName" id="fatherName">
            </div>
        </div>

        <div class="fieldsSection">
            <h3>Foto</h3>

            <div class="field">
                <label for="employeePhoto">
                    <img src="../../../assets/images/download.svg" alt="download"> 
                    <span data-default-text="Selecionar arquivo" id="fileName">Selecionar foto</span>

                    <input type="file" name="employeePhoto" id="employeePhoto" required accept=".png,.jpeg,.jpg">
                </label>

                <img src="#" alt="preview" id="preview">
            </div>
        </div>

        <div class="fieldsSection">
            <h3>Documentos</h3>

            <div class="field">
                <label for="rg">RG</label>
                <input type="text" name="rg" id="rg" required>
            </div>

            <div class="field">
                <label for="cpf">CPF</label>
                <input type="text" name="cpf" id="cpf" required>
            </div>

            <div class="field">
                <label for="pis">PIS</label>
                <input type="text" name="pis" id="pis" required>
            </div>

            <div class="field">
                <label for="employementCard">Carteira de trabalho</label>
                <input type="text" name="employementCard" id="employementCard" required>
            </div>
        </div>

        <div class="fieldsSection">
            <h3>Contatos</h3>

            <div class="field">
                <label for="tel">Telefone</label>
                <input type="tel" name="tel" id="tel" required>
            </div>

            <div class="field">
                <label for="cel">Celular</label>
                <input type="tel" name="cel" id="cel" required>
            </div>

            <div class="field">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" required>
            </div>

            <div class="field">
                <label for="password">Senha</label>
                <input type="text" name="password" id="password" required>
            </div>
        </div>

        <div class="fieldsSection">
            <h3>Endereço</h3>

            <div class="field small">
                <label for="cep">CEP</label>
                <input type="number" name="cep" id="cep" required>
            </div>

            <div class="field big">
                <label for="address">Endereço</label>
                <input type="text" name="address" id="address" disabled required>
            </div>

            <div class="field small">
                <label for="number">Número</label>
                <input type="number" name="number" id="number" min="0" required>
            </div>

            <div class="field">
                <label for="neighborhood">Bairro</label>
                <input type="text" name="neighborhood" id="neighborhood" disabled required>
            </div>

            <div class="field">
                <label for="city">Cidade</label>
                <input type="text" name="city" id="city" disabled required>
            </div>

            <div class="field small">
                <label for="state">Estado</label>
                <input type="text" name="state" id="state" disabled required>
            </div>
        </div>

        <hr>

        <div class="fieldsSection">
            <h3>Dados profissionais</h3>

            <div class="field small">
                <label for="office">Cargo</label>
                <input type="text" list="officesList" id="office" name="office" required>
                <datalist id="officesList">
                    <option value="Gerente">Gerente</option>
                    <option value="Diretor">Diretor</option>
                    <option value="Analista">Analista</option>
                    <option value="Assistente">Assistente</option>
                    <option value="Auxiliar">Auxiliar</option>
                </datalist>
            </div>

            <div class="field">
                <label for="sector">Setor</label>
                <input type="text" name="sector" id="sector" list="sectorsList" required>
                <datalist id="sectorsList">
                    <option value="Administrativo">Administrativo</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Operacional/produção">Operacional/produção</option>
                </datalist>
            </div>

            <div class="field">
                <label for="contract">Contrato</label>
                <input type="text" name="contract" id="contract" required>
            </div>

            <div class="fieldsSection">
                <h3>Jornada</h3>

                <div class="field">
                    <label for="journeyInit">Início</label>
                    <input type="time" name="journeyInit" id="journeyInit" required>
                </div>

                <div class="field">
                    <label for="journeyEnd">Final</label>
                    <input type="time" name="journeyEnd" id="journeyEnd" required>
                </div>
            </div>

            <div class="field">
                <label for="grossSalary">Salário bruto</label>
                <input type="number" name="grossSalary" id="grossSalary" step="0.01" min="0" required>
            </div>

            <div class="field small">
                <label for="hiring">Contratação</label>
                <input type="date" name="hiring" id="hiring" required>
            </div>
        </div>

        <div class="fieldsSection">
            <h3>Benefícios</h3>

            <div class="field inline">
                <label for="alimentação">Vale alimentação</label>
                <input type="checkbox" name="benefits" id="alimentação">
            </div>

            <div class="field inline">
                <label for="transporte">Vale transporte</label>
                <input type="checkbox" name="benefits" id="transporte">
            </div>

            <div class="field inline">
                <label for="saúde">Plano de saúde</label>
                <input type="checkbox" name="benefits" id="saúde">
            </div>

            <div class="field inline">
                <label for="odontológico">Plano odontológico</label>
                <input type="checkbox" name="benefits" id="odontológico">
            </div>
        </div>

        <div class="fieldsSection">
            <h3>Dados bancários</h3>

            <div class="field">
                <label for="bankAccount">Conta bancária</label>
                <input type="text" name="bankAccount" id="bankAccount" required>
            </div>

            <div class="field">
                <label for="bank">Banco</label>
                <input type="text" name="bank" id="bank" list="banksList" required>
                <datalist id="banksList">
                    <option>Banco do Brasil</option>
                    <option>Bradesco</option>
                    <option>Santadander</option>
                    <option>Itaú</option>
                    <option>Caixa</option>
                </datalist>
            </div>

            <div class="field small">
                <label for="agency">Agência</label>
                <input type="number" name="agency" id="agency" min="0" required>
            </div>
        </div>

        <div class="actions">
            <div class="actions buttons">
                <button type="reset" id="clear">Limpar todo formulário</button>
                <button type="submit" id="register">Finalizar cadastro</button>
            </div>

            <div id="loader" style="display: none;">
              <div>
                <dotlottie-player
                  src="https://lottie.host/29e5ec97-c579-4bd4-bba1-a1801849014d/I7wKA6dKTe.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></dotlottie-player>
              </div>
            </div>
        </div>
</form>

`

export function generateEmptyEmployeeForm(formId = 'newEmployee') {
    const formHTMLNode = new DOMParser().parseFromString(stringForm, 'text/html')
    const emptyEmployeeForm = formHTMLNode.body.firstElementChild

    emptyEmployeeForm.id = formId

    return emptyEmployeeForm
}

export function throwFormEvents(formId, sumitFormCallback) {
    const form = document.querySelector(`form#${formId}`)
    const cepInput = document.getElementById('cep')
    const birthdayInput = document.getElementById('birthday')

    cepInput?.addEventListener('keyup', () => {
        if(cepInput.value.length >= 8) {
            allUtils.getCepInfos(cepInput.value).then(infos => {
    
                if(infos.erro) {
                    cepInput.style.borderColor = "red"
                    cepInput.style.outlineColor = "red"
                    return
                }
    
                cepInput.style.borderColor = "green"
                cepInput.style.outlineColor = "green"
    
                document.getElementById('address').value = infos.logradouro
                document.getElementById('neighborhood').value = infos.bairro
                document.getElementById('city').value = infos.localidade
                document.getElementById('state').value = infos.uf
            }).catch(error => {
                allUtils.toastAlert({message: 'CEP inválido', description: 'Verifique o CEP inserido', className: 'danger'})

                cepInput.style.borderColor = "red"
                return
            })
        }
    })

    birthdayInput.addEventListener('blur', () => {
        if(!birthdayInput.value) {
            return
        }

        const date = new Date(birthdayInput.value)
        const diff = new Date(Date.now() - date)
        const diffInYears = Math.abs(diff.getUTCFullYear() - 1970)
        
        document.getElementById('age').value = diffInYears
    })

    const employeePhoto = document.getElementById('employeePhoto')
    const previewImage = document.getElementById('preview')
    const fileName = document.getElementById('fileName')
    const clearButton = document.getElementById('clear')

    employeePhoto.addEventListener('change', () => {
        if(!employeePhoto.files[0]) return

        previewImage.src = URL.createObjectURL(employeePhoto.files[0])

        fileName.textContent = employeePhoto.files[0].name
        // console.log(bannerFileInput.files[0])
    })

    clearButton.addEventListener('click', () => {
        previewImage.src = '#'
        fileName.textContent = fileName.getAttribute('data-default-text')

        form.querySelectorAll('input[checked=true]').forEach(inp => inp.removeAttribute('checked'))

        form.querySelector('input').focus()
    })

    if(sumitFormCallback) {
        form.addEventListener('submit', (ev) => {
            ev.preventDefault()

            const imagePreview = form.querySelector('#preview')

            if(imagePreview.getAttribute('src') == "#") {
                form.querySelector('input[type="file"]').setAttribute('required', 'true')
                form.querySelector('input[type="file"]').reportValidity()
            }

            sumitFormCallback(ev)
        })
    }
}

export function buildFilledEmployeeForm(employeeData, formId) {
    if(!employeeData || !formId) return

    const employeeForm = generateEmptyEmployeeForm(formId)

    const allElements = employeeForm.querySelectorAll('input, select')

    allElements.forEach((element, index) => {
        const name = element.name
        const key = name.toLowerCase()

        if(element.type == 'file') {
            employeeForm.querySelector('#fileName').innerText = employeeData['employeephotoname']
            employeeForm.querySelector('#preview').src = stafflinkURL_employeePhoto + employeeData['employeephotoname']
            element.removeAttribute('required')
        } else if(element.type == 'checkbox') {
            const allBenefits = employeeData[key].split(',').map(benefit => benefit.trim())

            allBenefits.forEach(benefit => {                
                if(element.id == benefit) {
                    allElements[index].setAttribute('checked', 'true')
                }
            })
        } else {
            allElements[index].value = employeeData[key]
        }
    })
    return employeeForm
}