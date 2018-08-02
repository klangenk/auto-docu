import React, { Component, Fragment } from 'react';
import brace from 'brace';
import Editor from 'react-ace';
import logo from './logo.svg';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';

import Inspector from 'auto-docu/lib/Inspector';
import putInspect from 'auto-docu/lib/putInspect'
import JSDoc from 'auto-docu/lib/JsDoc'
import './App.css';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

const editorProps = {
  fontSize: 16,
  height: "100%",
  width: '100%',
  mode: "javascript",
  theme: "monokai",
  editorProps:{ $blockScrolling: true },
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true
}



class App extends Component {
  constructor(props) {
    super(props)
    const src = 'function a (b) { return 8 }'
    const src2 = 'a(7)'
    this.state = {
      src,
      src2,
      calls: '',
      result: '',
    }


  }

  componentDidMount() {
    this.onChange()
  }

  async onChange({ src = this.state.src, src2 = this.state.src2 } = {}) {
    const { source, functions } = putInspect(src, 1, true)
    let calls
    let result
    var inspector = new Inspector(1, (c) => {
      calls = c
    })
    this.setState({
      src,
      src2
    })
    try {
      await eval(`(async () => {
        ${source}
        ${src2}
      })()`)
      await Promise.all(Inspector.promises)
      result = new JSDoc(functions, calls).write(src)
    } catch (err) {
      this.setState({
        result: err.message
      })
      return
    }
    this.setState({
      src,
      src2,
      functions,
      inspection: source,
      result
    })
  }


  // Render editor
  render() {
    return (
      <Fragment>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Auto Docu Playground
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="space-between" style={{ flexGrow: 1, padding: 20, height:'100%' }} spacing={32}>
          <Grid item xs={12} sm={6} lg={4}>
            <Typography gutterBottom align="center" variant="title" color="inherit">
              Definition
            </Typography>
            <Editor
              {...editorProps}
              onChange={src => this.onChange({ src })}
              value={this.state.src}
              name="src"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Typography gutterBottom align="center" variant="title" color="inherit">
              Usage
            </Typography>
            <Editor
               {...editorProps}
              onChange={src2 => this.onChange({ src2 })}
              value={this.state.src2}
              name="src2"
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={4}>
            <Typography gutterBottom align="center" variant="title" color="inherit">
              Result
          </Typography>
            <Editor
              {...editorProps}
              value={this.state.result}
              name="result"
              readOnly
            />
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default App;
