import React, { useState, useRef }  from "react";
import { Form as BulmaForm, Button } from 'react-bulma-components'

const { Field, Control, Label, Input } = BulmaForm

export const Form =({ handleSubmit }) => {
    const [formValues, setFormValues] = useState  ({
        name: '',
        priceUnitary: '',
        size: '',
        description: '',
    })
    
    const inputFileRef = useRef()


    const handleChange = (event) => {
        const {name, value } = event.target
     //   console.log(name, value)

        setFormValues({ ...formValues, [name]: value   })
       
    }

    const _handleSubmit = (e) => {

        e.preventDefault()
        handleSubmit({ ...formValues, image: inputFileRef.current })

    }
    
    return (
      <form onSubmit = {_handleSubmit}>
         <Field>
             <Label>name</Label>
             <Control>
                 <Input 
                   placeholder="Text input"
                   name ="name"
                   value = {formValues.name}
                   onChange ={handleChange}
                 />
             </Control>
         </Field>

         <Field>
             <Label>Price Unitary</Label>
             <Control>
                 <Input 
                   placeholder="Text input"
                   type = "number"
                   name ="priceUnitary"
                   value = {formValues.priceUnitary}
                   onChange ={handleChange}
                 />
             </Control>
         </Field>

        <Field>
             <Label>Size</Label>
             <Control>
                 <Input 
                   placeholder="Text input"
                   type = "number"
                   name ="size"
                   value = {formValues.size}
                   onChange ={handleChange}
                 />
             </Control>
         </Field>      

        <Field>
             <Label>Description</Label>
             <Control>
                 <Input 
                   placeholder="Text input"
                   name ="description"
                   value = {formValues.description}
                   onChange ={handleChange}
                 />
             </Control>
         </Field>     

         <Field>
             <Label>Image</Label>
             <Control>
                 <Input type ="file" ref = {inputFileRef} />
             </Control>
         </Field>      

         <Button type="submit" color="primary">
             Save
         </Button>

      </form>

    )
}

export default Form