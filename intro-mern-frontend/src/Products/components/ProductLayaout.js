import React ,{ useState, useEffect} from "react";
import { Modal, Container } from 'react-bulma-components'
import Header from './Header'
import AddButton from "./Addbutton";
import ListProducts from "./ListProducts";
import Form from './Form'
import Loading from "./Loading";
import { saveProducts,getProducts  } from "../services";


//import { Button } from 'react-bulma-components'
// va dentro de la funcion return <Button onClick ={() => setIsLoading(!isLoading)}>update</Button>

const ProductLayout = () => {
    const [isModalOpen, setIsModalOpen ] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])

    async function loadProducts (){
        const response = await getProducts()
        
        if (response.status === 200){
            setProducts(response.data.products)
        }
        
        setIsLoading(false)
     }

    useEffect( () => {
         loadProducts()
    },[])

    const handleSubmit = async (data)  =>{
        await saveProducts(data)
        loadProducts()
        setIsModalOpen(false)
    }

    return (
        <Container>
            <Header title ="Products app" />
            <AddButton onClick = {() => setIsModalOpen(true)} />
            {
                isLoading && <Loading />
            }

            {
               !isLoading && !products.length && (
                <h2 className="title has-text-centered">
                    'You don\'t have products'
                </h2>
                )
            }

            {
                !isLoading && products.length && <ListProducts products = {products}/>
            }

            
            <Modal show = {isModalOpen} onClose ={() => setIsModalOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header showClose={false}>
                        <Modal.Card.Title>
                           Add product
                        </Modal.Card.Title>  
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                       <Form handleSubmit ={handleSubmit}/>
                    </Modal.Card.Body>
                </Modal.Card>
            </Modal>
        </Container>
    )
}

export default ProductLayout