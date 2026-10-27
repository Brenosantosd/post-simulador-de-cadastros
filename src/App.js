import React , {useState} from "react";
import "./App.css"


//url: "https://jsonplaceholder.typicode.com/users"


function App(){

const [nome , setNome] = useState('')
const [email , setEmail] = useState('')
const [confirmarEmail , setConfirmarEmail] = useState('')
const [erro , setErro] = useState(false)
const [erro2, setErro2] = useState(false)
const [carregando , setCarregando] = useState(false)
const [cadastros, setCadastros] = useState([])


function handleCadastro(e){
  // Prevenção de Refresh
  e.preventDefault()

  // Limpa mensagens de erro anteriores
  setErro('')
  setErro2('')

 // Prevenção de toque duplo

 if(carregando) return;

 // Prevenção de espaços em branco

  if(nome.trim() === '' || email.trim() === '' || confirmarEmail.trim() === ''){
    setErro(true)
    return;
  }
  // Prevenção de envios em branco ! 
  
   if(nome === '' || email === '' || confirmarEmail === ''){
    setErro(true)
    return;
   }

   // Prevenção de campos obrigatórios 

   if(!nome || !email || !confirmarEmail){
    setErro(true)
    return;
   }

   // Prevenção de email não correspondente 

   if(email !== confirmarEmail){
    setErro2(true)
    return; 
   }

   // Parar o carregando 

   setCarregando(true)

   let url = "https://jsonplaceholder.typicode.com/users"

   fetch(url ,{
    method: 'POST',
    headers: {
       'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       name: nome,
       email: email,
        
    })    
   })
   .then((r)=> r.json())
   .then((json)=>{
     console.log("Resposta ao servidor" , json )
     setCadastros([...cadastros , json])
     setErro(false)
     setErro2(false)
     setNome('')
     setEmail('')
     setConfirmarEmail('')
     setCarregando(false)
   })

   .catch((error)=>{
    console.log("Erro ao Cadastrar" , error)
   })
   
}

function handleExcluir(idParaExcluir){
   let novaLista = cadastros.filter((item)=> item.id !== idParaExcluir)
   setCadastros(novaLista)
}

  return(
    <div className="container">

      <header>
      <h1>Simulador de Cadastro (POST)</h1>


      </header>

      <div className="card-form">
        <form onSubmit = {handleCadastro} className="form">
          {erro  && <p>Prrencha corretamente os campos !</p>}
          {erro2 && <p>Os emails não correspondem !</p>}
          <h3>Formulário</h3>
       <label>Nome: </label>
       <input type="text" placeholder="Digite o seu nome!" value = {nome} onChange={(e)=> setNome(e.target.value)}/>
       <label>Email: </label>
       <input type="text" placeholder="Digite o seu email !" value = {email} onChange = {(e)=> setEmail(e.target.value)}/>
       <label>Confirmar Email: </label>
       <input type = "email" placeholder="Confirme o email !" value = {confirmarEmail} onChange ={(e)=> setConfirmarEmail(e.target.value)}/>
       <div className="botao">
      <button type="submit">{carregando ? "Enviando" : "Enviar"}</button>
       </div> 
        </form>

      </div>

      {cadastros.length > 0 && (
        <div className="resultado-cadastros">
          {cadastros.map((item)=>{
 
         return(
            <div key = {item.id} className="card-cadastros">
                 <h1>Usuário Cadastrado com Sucesso !</h1>
                 <p><strong>Id: </strong>{item.id}</p>
                 <p><strong>Nome: </strong>{item.name}</p>
                 <p><strong>Email: </strong>{item.email}</p>

                 <button onClick = {()=> handleExcluir(item.id)}>Excluir</button>
            </div>

          )

          })}

        </div>
      )}

    </div>
  )
}

export default App;