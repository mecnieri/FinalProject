import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';
import Tabs from './Tabs';



class Description extends React.Component {
       render() {
        return (
            <section className="item" >
                <div className="container">
                    <div className="image-and-description">
                        <div className="image">
                        </div>
                        <div className="description">
                            <div className="description--rating"></div>
                            <div className="description--title">
                                {
                                    this.props.Data.map(item => (
                                        <p key={item.id} className="item-title"> {item.name}</p>
                                    ))
                                }
                            </div>
                            <div className="description--details">
                                {
                                    this.props.Data.map(item => (
                                        <p key={item.id}> {item.details}</p>
                                    ))
                                }
                            </div>
                            <div className="description--item-price">
                                {
                                    this.props.Data.map(item => (
                                        <p key={item.id} className="price"> {item.price}$</p>
                                    ))
                                }
                            </div>
                            <div className="description--cart">
                                <input type="number" className="quantity" />
                                <button className="btn btn-success btn-cart">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                    <Tabs>
                        <div label="Description">
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius provident mollitia optio soluta eveniet, alias doloribus? Pariatur, nihil dolores ab illum, sit, sint nostrum commodi praesentium ad autem sunt aut!

                        </p>
                        </div>
                        <div label="Additional Information">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus quam maiores architecto cumque corrupti exercitationem, consequuntur quasi laborum eaque itaque, et consequatur ratione quae voluptatem eum soluta culpa, expedita fugiat.</p>
                        </div>
                        <div label="Features">
                            <p>Processor: I7-9700U</p>
                            <p>RAM: 8GB </p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ratione delectus repellat recusandae similique excepturi nihil! Repellendus recusandae, excepturi nihil quae, molestiae cupiditate officia dignissimos consequatur non soluta hic nulla!
                        </div>
                    </Tabs>
                </div>
            </section>
        );
    }
}

export default Description;