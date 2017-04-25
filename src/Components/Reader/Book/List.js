import React from 'react'

import { List, Title } from './Styles';
import Cover from './Cover';

export default ({ items, name, onSelected }) => 
    <div>
        <List.Name>{ name || '' }</List.Name>
        <List style={{padding:'20px 30px'}}>
            { (items || []).map((item, i) => (
                <List.Item key={i} onClick={() => onSelected(item)}>
                    <Cover img={item.img} style={{width: 144,height: 200,margin:'auto'}} />
                    <Title>{ item.title || '' }</Title>
                </List.Item>
            )) }
        </List>
    </div>
