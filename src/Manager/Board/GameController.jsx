import React from 'react'
import Table from './Table/Table';
import Player from './Dashboard/Player';

function Board(props) {
    const {board, turn, isDisabled, state} = props

  return (
    <div style={{display:'grid', justifyContent:'center', alignItems:'center',  height:'100%', textAlign:'center', fontSize:40, paddingTop:40}} >
        <Player turn={turn}></Player>
        <Table state = {state} board = {board} isDisabled= {isDisabled}></Table>
    </div>
  )
}

export default Board