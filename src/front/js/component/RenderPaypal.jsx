import React, { useRef, useEffect } from 'react'


const RenderPaypal = () => {

    const paypal = useRef();

    useEffect(()=>{
        window.paypal.Buttons({
            createOrder: (data, actions, err)=>{
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {  
                            description: "Donación",
                            amount: {
                                currency_code: "USD",
                                value: 1,
                            }
                        },
                    ]
                })
            },
            onApprove: async (data, actions) =>{
                const order = await actions.order.capture();
                
                console.log("pago realizadO",order)
            },
            onError: (err) => {
                console.log(err)
            }
        })
        .render(paypal.current)
    },[])


    return (
    <div>
        <div ref={paypal}>holi</div>

    </div>
    )
}

export default RenderPaypal;
