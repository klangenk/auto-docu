import React, { Component, Fragment } from 'react';
import brace from 'brace';
import { split as SplitEditor } from 'react-ace';
import logo from './logo.svg';

import Inspector from 'auto-docu/lib/Inspector';
import putInspect from 'auto-docu/lib/putInspect'
import JSDoc from 'auto-docu/lib/JsDoc'
import './App.css';

import 'brace/mode/java';
import 'brace/theme/github';



class App extends Component {
  constructor (props) {
    super(props)
    const src = 'function a (b) { return 8 }'
    const { source, functions } = putInspect(src, 1, true)
    this.state = {
      src,
      src2: 'a(7)',
      calls: '',
      result: '',
      functions,
      inspection: source
    }
    
  }

  

  onChange = ([src, src2]) => {
    const { source, functions } = putInspect(src, 1, true)
    this.setState({
      src,
      src2,
      functions,
      inspection: source
    })
  }

  // Render editor
  render() {
    return (
      <Fragment>
        <button onClick={() => {
          var inspector = new Inspector(1,(calls) => {
            const result = new JSDoc(this.state.functions, calls).write(this.state.src)
            this.setState({
              result
            })
          })
          try {
            eval(`${this.state.inspection}\n${this.state.src2}`)
          }catch (err) {
            console.error(err)
          }
        }}>Play</button>
        <SplitEditor
          width='100%'
          mode="java"
          theme="github"
          splits={3}
          orientation="aside"
          onChange={this.onChange}
          value={[this.state.src, this.state.src2, this.state.result]}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
      </Fragment>
    )
  }
}

export default App;
