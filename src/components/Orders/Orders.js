import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Orders.module.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter  } from "react-router-dom";

class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items:[]
    };
  } 
  removeOrder= async (OrderId) => {
    console.log('in function',OrderId)
    const api = `https://87ztnje4aa.execute-api.eu-central-1.amazonaws.com/V1/BZU1_WebPage/order/${OrderId}?TableName=BZU1_Orders`;
    var dataItem = (JSON.stringify({TableName:"BZU1_Orders",
    Key: 
           {
               "orderId":OrderId
           }
    }));

    console.log(dataItem)
    axios
      .delete(api,{data:dataItem})
      .then((response) => {
        console.log(response)
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    const api = 'https://87ztnje4aa.execute-api.eu-central-1.amazonaws.com/V1/BZU1_WebPage/order?TableName=BZU1_Orders';
    axios
      .get(api, {})
      .then((response) => {
        console.log(response)
        if(response?.data?.Items && response?.data?.Items.length>0){
          let newItems=[];
           response?.data?.Items.map((x,index) => {
            newItems.push({
              products:x.purchases,
              customerId:x.customerId,
              orderId:x.orderId
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
    return (<div>
      <h1>Orders</h1>
      <Grid container
  direction="row"
  justify="center"
  xs={12}
  alignItems="center" spacing={2}> 
      {this.state.items.map((item, index) => (
        <Grid item>
          <Card >
            <CardContent>
            <Typography variant="textSecondary" component="h2" className={styles.productName}>
            {item.products}

              </Typography>
              <Typography color="textSecondary" component="h2" gutterBottom>
                customer: {item.customerId}

              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>{this.removeOrder(item.orderId)}}>remove order</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      </Grid>
      <Button size="small" onClick={()=>{
 this.props.history.push("/deliveries");
}}>Check My deliveries</Button>
      </div>);
  }
}

export default withRouter(Orders);
