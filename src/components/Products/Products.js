import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Products.module.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter  } from "react-router-dom";

class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items:[]
    };
  } 
  addOrder= (ProductName) => {
    console.log('in function',ProductName)
    const api = 'https://87ztnje4aa.execute-api.eu-central-1.amazonaws.com/V1/BZU1_WebPage/order?TableName=BZU1_Orders';
    var dataItem = (JSON.stringify({TableName:"BZU1_Orders",
    Item: 
           {
               "customerId": "10",
               "purchases":ProductName,
               "orderId":"4"
           }
    }));
    console.log(dataItem)
    axios
      .post(api, {dataItem})
      .then((response) => {
        console.log(response)
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    const api = 'https://87ztnje4aa.execute-api.eu-central-1.amazonaws.com/V1/BZU1_WebPage/products?TableName=BZU1_Products';
    axios
      .get(api, {})
      .then((response) => {
        console.log(response)
        if(response?.data?.Items && response?.data?.Items.length>0){
          let newItems=[];
           response?.data?.Items.map((x,index) => {
            newItems.push({
              productName:x.Product_Name,
              totalPrice:x.price,
              productId:x.Product_ID
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
      <h1>Products</h1>
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
            {item.productName}

              </Typography>
              <Typography color="textSecondary" component="h2" gutterBottom>
                Price: {item.totalPrice}

              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>{this.addOrder(item.productName)}}>Add to orders</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      </Grid>
      <Button size="small" onClick={()=>{
 this.props.history.push("/order");
}}>Check My order</Button>
      </div>);
  }
}

export default withRouter(Products);
