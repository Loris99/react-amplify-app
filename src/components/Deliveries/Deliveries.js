import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Deliveries.module.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter  } from "react-router-dom";

class Deliveries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items:[]
    };
  } 
  checkOrder = async(orderId) =>{
    console.log('in function', orderId)
    const api = `https://87ztnje4aa.execute-api.eu-central-1.amazonaws.com/V1/BZU1_WebPage/order/${orderId}?TableName=BZU1_Orders`;
    var dataItem = (JSON.stringify({TableName:"BZU1_Orders",
    Key: 
           {
               "orderId":orderId
           }
    }));
    console.log(dataItem)
    axios
      .get(api,{data:dataItem})
      .then((response) => {
        console.log(response)
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  componentDidMount() {
    const api = 'https://87ztnje4aa.execute-api.eu-central-1.amazonaws.com/V1/BZU1_WebPage/deliveries?TableName=BZU1_Delivery';
    axios
      .get(api, {})
      .then((response) => {
        if(response?.data?.Items && response?.data?.Items.length>0){
          let newItems=[];
           response?.data?.Items.map((x,index) => {
            newItems.push({
              orderId:x.orderId,
              deliveryId:index,
              totalPrice:x.totalPrice
            }) 
            this.setState({items:[...newItems]});

          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  render() {
    return (<div> <h1>Deliveries</h1> <Grid container
      direction="row"
      justify="center"
      xs={12}
      alignItems="center" spacing={2}> 
          {this.state.items.map((item, index) => (
            <Grid item>
              <Card >
                <CardContent>
                <Typography variant="textSecondary" component="h2" className={styles.orderId}>
                {item.orderId}
    
                  </Typography>
                  <Typography color="textSecondary" component="h2" gutterBottom>
                    Price: {item.totalPrice}
    
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=>{
                    this.props.history.push("/orders")}}>check my order</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          </Grid>
          {/* <Button size="small" onClick={()=>{
     this.props.history.push("/orders");
    }}>Check My order</Button> */}
          </div>);
      }
    }
//       <h1>Dileveries</h1>
//       {this.state.items.map((item, index) => (
//           <p>order id, {item.orderId} price {item.totalPrice}!</p>
//       ))}
//       </div>);
//   }
// }

export default withRouter(Deliveries);
