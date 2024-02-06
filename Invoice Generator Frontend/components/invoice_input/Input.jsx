import React,{useState} from 'react';
import '/public/CSS/input.css'
import '/public/CSS/table.css'
import { Table } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { Switch } from '@mui/material';

const Input = () => {
  // Intialization of the data
  const [sellerDetails,setSellerDetails] = useState({
    company_name : '',
    company_address : '',
    company_state : '',
    company_city : '',
    company_pincode : '',
    company_ut_code : '',
    company_pan : '',
    compnay_gst : ''
  })
  const [shippingDetails,setShippingDetails] = useState({
    shipping_name : '',
    shipping_address : '',
    shipping_state : '',
    shipping_city : '',
    shipping_pincode : '',
    shipping_ut_code : '' 
  })
  const [billingDetails,setBillingDetails] = useState({
    billing_name : '',
    billing_address : '',
    billing_state : '',
    billing_city : '',
    billing_pincode : '',
    billing_ut_code : ''
  })
  const [ otherDetails,setOtherDetails] = useState({
    invoice_no : '',
    invoice_details:'',
    invoice_date : Date.now(),
    order_no : '',
    order_date:Date.now(),
  })
  const [checked,setChecked] = useState(true)
  const [items,setItems] = useState([
    {description: '', quantity: '', unitPrice: '', discount: ''}
  ])
  const [logoPreview,setLogoPreview] = useState(null)
  const [signPreview,setSignPreview] = useState(null)

  // handling the inputs
  const handle_selling_change = (e) =>{
    const {name,value} = e.target
    setSellerDetails({
      ...sellerDetails,
      [name] : value
    })
  }
  const handle_billing_change = (e) =>{
    const {name,value} = e.target
    setBillingDetails({
      ...billingDetails,
      [name] : value
    })
  }
  const handle_shipping_change = (e) =>{
    const {name,value} = e.target
    setShippingDetails({
      ...shippingDetails,
      [name] : value
    })
  }
  const handle_other_details_change = (e) => {
    const {name,value} = e.target
    setOtherDetails({
      ...otherDetails,
      [name] : value
    })
  }
  const handle_checked = (e) =>{
    setChecked(e.target.checked)
  }
  const handle_row_input = (index,field,value) =>{
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  }
  
  // delete the row element
  const handle_delete_item = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  // handle add new row
  const handle_add_row = () => {
    console.log("add row");
    setItems([...items, { description: '', quantity: '', unitPrice: '', discount: ''}]);
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = {
      selling_details : sellerDetails,
      billing_details : billingDetails,
      shipping_details : shippingDetails,
      other_details : otherDetails,
      items : items,
      reverse_charge : checked,
      logo_img : logoPreview,
      sign_img : signPreview
    }
    console.log(data);
    try{
      const response = await fetch('http://localhost:3000/generate-inovice',{
        method : 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      })
      
      const results = await response.json()
      if(!results.success){
        console.log('Error processing Data :', results.message);
      }else{
        console.log('hello');
      }
    }catch(err){
      console.log('Error processing Data :', err.message);
    }
  }

// handling the image input and preview
  const handleSignImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setSignPreview(reader.result)
      };

      reader.readAsDataURL(file)
    }
  }
  const handleLogoImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }
  //handling remove image
  const handleDeletePreview = () => {
    setSignPreview(null)
  }
  const handleDeleteLogoPreview = () => {
    setLogoPreview(null)
  }
  return (
    <div className='main'>
      <div className="navbar">
        <h3>Invoice Generator</h3>
      </div>
      <div className="white_back">
        <div className="Logo_and_text">
          <div className="logo">
              <div className="details_head">Logo</div>
              {!logoPreview && (
                <input className='input_img' type="file" accept="image/*" onChange={handleLogoImageChange} />
              )}

              {logoPreview && (
                <div className='preview_img_div'>
                  <div className="preview_sign_img"><img src={logoPreview} alt="Preview"/></div>
                  <div className="cancel_btn_preview"><button onClick={handleDeleteLogoPreview}>Cancel</button></div>
                </div>
              )}
          </div>
          <div className="heading_main">Invoice</div>
        </div>
        <div className="liner"></div>
      <div className="details_input">
            <div className="shipping_seller">
              {/* seller details */}
              <div className="details_backgrnd">
                <div className="details_head">Seller Details:</div>
                <div className="details_inner_back">
                    <div className="input_div">
                      <input type="text" className='name' name='company_name'
                        value={sellerDetails.company_name} placeholder='Company Name' onChange={handle_selling_change}/>
                      <input type="text" className='address' name='company_address' 
                        value={sellerDetails.company_address} placeholder='Address' onChange={handle_selling_change}/>
                      <input type="text" className='state' name='company_state' 
                        value={sellerDetails.company_state}  placeholder='State' onChange={handle_selling_change}/>
                      <div className="city_code">
                        <input type="text" className='city' name='company_city' 
                          value={sellerDetails.company_city}  placeholder='City' onChange={handle_selling_change}/>
                        <input type="number" className='pincode' name='company_pincode' 
                          value={sellerDetails.company_pincode}  placeholder='Pincode' onChange={handle_selling_change}/>
                      </div>
                      <input type="number" className='tel' name='company_ut_code' 
                        value={sellerDetails.company_ut_code}  placeholder='State\UT code' onChange={handle_selling_change} />
                    </div>
                  </div>
                  </div>
              {/* Shipping details */}
              <div className="details_backgrnd">
                <div className="details_head">Shipping Details:</div>
                <div className="details_inner_back">
                    <div className="input_div">
                      <input type="text" className='name' name='shipping_name' 
                        value={shippingDetails.shipping_name} placeholder='Name' onChange={handle_shipping_change}/>
                      <input type="text" className='address' name='shipping_address' 
                        value={shippingDetails.shipping_address} placeholder='Address' onChange={handle_shipping_change}/>
                      <input type="text" className='state' name='shipping_state' 
                        value={shippingDetails.shipping_state} placeholder='State' onChange={handle_shipping_change} />
                      <div className="city_code">
                        <input type="text" className='city' name='shipping_city' 
                        value={shippingDetails.shipping_city} placeholder='City' onChange={handle_shipping_change} />
                        <input type="number" className='pincode' name='shipping_pincode' 
                        value={shippingDetails.shipping_pincode} placeholder='Pincode' onChange={handle_shipping_change} />
                      </div>
                      <input type="number" className='tel' name='shipping_ut_code' 
                        value={shippingDetails.shipping_ut_code} placeholder='State\UT code' onChange={handle_shipping_change} />
                    </div>
                </div>
              </div>
            </div>
            {/* billing, invoice & order details */}
            <div className="billing_invoice">
              {/* Billing Details */}
                <div className="details_backgrnd">
                  <div className="details_head">Billing Details:</div>
                  <div className="details_inner_back">
                      <div className="input_div">
                        <input type="text" className='name' name='billing_name' 
                          value={billingDetails.billing_name} placeholder='Name' onChange={handle_billing_change}/>
                        <input type="text" className='address' name='billing_address' 
                          value={billingDetails.billing_address} placeholder='Address' onChange={handle_billing_change}/>
                        <input type="text" className='state'  name='billing_state' 
                          value={billingDetails.billing_state} placeholder='State'  onChange={handle_billing_change}/>
                        <div className="city_code">
                          <input type="text" className='city' name='billing_city' 
                            value={billingDetails.billing_city} placeholder='City' onChange={handle_billing_change} />
                          <input type="number" className='pincode' name='billing_pincode' 
                            value={billingDetails.billing_pincode} placeholder='Pincode' onChange={handle_billing_change}/>
                        </div>
                        <input type="number" className='tel' name='billing_ut_code' 
                        value={billingDetails.billing_ut_code} placeholder='State\UT code' onChange={handle_billing_change} />
                      </div>
                  </div>
                </div>
                  <div className="invoice_order">
                  {/* Invoice details */}
                  <div className="details_backgrnd invoice">
                    <div className="details_head" >Invoice Details:</div>
                    <div className="details_inner_back">
                        <div className="input_div">
                          <input type="number" className='name' name='invoice_no' 
                            value={otherDetails.invoice_no} placeholder='Invoice No.' onChange={handle_other_details_change}/>
                          <input type="text" className='address' name='invoice_details' 
                            value={otherDetails.invoice_details} placeholder='Invoice Details' onChange={handle_other_details_change}/>
                          <input type="date" className='state' name='invoice_date' 
                            value={otherDetails.invoice_date} placeholder='Inovoice Date' onChange={handle_other_details_change}/>
                        </div>
                    </div>
                  </div>
                  {/* Order details */}
                  <div className="details_backgrnd order">
                    <div className="details_head">Order Details:</div>
                    <div className="details_inner_back">
                        <div className="input_div">
                          <input type="number" className='name' name='order_no' 
                            value={otherDetails.order_no} placeholder='Order No.' onChange={handle_other_details_change} />
                          <input type="date" className='state' name='order_date' 
                            value={otherDetails.order_date}  placeholder='Order Date' onChange={handle_other_details_change} />
                        </div>
                    </div>
                  </div>
                </div>
                </div>
            </div>
      <div className="back_pan_gst">
        <div className="inner_back_pg">
          <input type="text" placeholder='PAN No.' name='company_pan' 
            value={sellerDetails.company_pan} onChange={handle_selling_change}/>
          <input type="text" placeholder='GST Registration No.' name='compnay_gst' 
            value={sellerDetails.compnay_gst} onChange={handle_selling_change}/>
        </div>
      </div>
      <div className="items_table">
        <Table className='table_design'>
          <thead>
            <th className='descrip'>Description</th>
            <th className='qua'>Quantity</th>
            <th className='pri'>Unit Price</th>
            <th className='disc'>Discount(%)</th>
            <th className='canc'></th>
          </thead>
          <tbody>
            {items.map((item,index)=>(
              <tr key={index}>
              <td className='descrip'>
                <input type="text" value={item.description}
                  onChange={(e) => handle_row_input(index, 'description', e.target.value)} />
              </td>
              <td className='qua'>
                <input type="number" value={item.quantity}  
                  onChange={(e) => handle_row_input(index, 'quantity', e.target.value)} />
              </td>
              <td className='pri'>
                <input type="number" value={item.unitPrice}
                  onChange={(e) => handle_row_input(index, 'unitPrice', e.target.value)} />
              </td>
              <td className='disc'>
                <input type="number" value={item.discount} 
                  onChange={(e) => handle_row_input(index, 'discount', e.target.value)} />
              </td>
              <td className='canc'><CloseIcon onClick={() => handle_delete_item(index)} sx={{ fontSize: 27 , color:'#8c8d8f' }}/></td>
            </tr>
            ))}
          </tbody>
        </Table>
        <button className='add_new_item' onClick={handle_add_row} >+ Add item</button>
        </div>
        <div className="liner_down"></div>
        <div className="sign_charge">
          <div className="reverseCharge">
            <div>Reverse Charge</div>
            <Switch
              name='checked'
              checked = {checked}
              onChange={handle_checked}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
          <div className="signature">
            <div className="details_head">Signature</div>
            {!signPreview && (
              <input className='input_img' type="file" accept="image/*" onChange={handleSignImageChange} />
            )}

            {signPreview && (
              <div className='preview_img_div'>
                <div className="preview_sign_img"><img src={signPreview} alt="Preview"/></div>
                <div className="cancel_btn_preview"><button onClick={handleDeletePreview}>Cancel</button></div>
              </div>
            )}
          </div>
        </div>
      {/* dfsdf */}
      <div>
        
      </div>
      <div className="submit_btn"><button onClick={handleSubmit}>Submit</button></div>
      </div>
    </div>
  );
}

export default Input;
