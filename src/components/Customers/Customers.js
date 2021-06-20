import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Customers.module.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter  } from "react-router-dom";

class Customers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items:[]
    };
  } 
  chooseProduct= (orderId) => {
    console.log('in function',orderId)
    const api = 'https://87ztnje4aa.execute-api.eu-central-1.amazonaws.com/V1/BZU1_WebPage/products?TableName=BZU1_Products';
    var dataItem = (JSON.stringify({TableName:"BZU1_Products",
    Item: 
           {
               "customerId": "10",
               "orderId":orderId,
               "customer_name":"test",
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

    const api = 'https://87ztnje4aa.execute-api.eu-central-1.amazonaws.com/V1/BZU1_WebPage/Customers?TableName=BZU1_Customers';
    axios
      .get(api, {})
      .then((response) => {
        console.log(response)
        if(response?.data?.Items && response?.data?.Items.length>0){
          let newItems=[];
           response?.data?.Items.map((x,index) => {
            newItems.push({
              orderId:x.orderId,
              customer_name:x.customer_name,
              customerId:x.id,
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
      <h1>Customers</h1>
      <Grid container
  direction="row"
  justify="center"
  xs={12}
  alignItems="center" spacing={2}> 
      {this.state.items.map((item, index) => (
        <Grid item>
          <Card >
            <CardContent>
            <Typography variant="textSecondary" component="h2" className={styles.customer_name}>
            {item.customer_name}

              </Typography>
              <Typography color="textSecondary" component="h2" gutterBottom>
                orderId: {item.orderId}

              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>{this.props.history.push("/Products")}}>choose product to order</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      </Grid>
      <Button size="small" onClick={()=>{
 this.props.history.push("/orders");
}}>Check My order</Button>
      </div>);
  }
}

export default withRouter(Customers);
