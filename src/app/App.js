import React, { Component } from 'react';
import './App.css';
import Editor from 'for-editor'
import m2c from "../util/m2c"

class App extends Component {
  constructor() {
    super()
    let initText = `# 一级标题

一级标题
===

## 二级标题 

二级标题
---

### 三级标题  

- **加粗**
- *斜体*
- ~~删除线~~
- \`行内代码\`

> 引用  

[链接](http://m2c.20cm.top)


\`\`\`javascript
var i = 1 //代码
console.log("This is code block")
\`\`\`


![图片](https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg)

## 表格

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
*inline style* | **inline style**
`

    this.state = {
      value: initText,
      confluenceValue: m2c(initText).replace(/\n\n$/, '')
    }
  }

  handleChange = (value) => {
    this.setState({
      value,
      confluenceValue: m2c(value).replace(/\n\n$/, '')
    })
  }

  copy = () => {
    let content = document.getElementById("content")
    content.select()
    document.execCommand('Copy')
  }

  save = () => {
    let blob = new Blob([this.state.value], { type: 'text/html' })
    let url = URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.href = url
    a.download = `m2c.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  render() {
    const { value, confluenceValue } = this.state
    return (
      <div className="app">
        <Editor className="markdown-editor" lineNum={true} value={value} onChange={this.handleChange} onSave={this.save} />
        <div className="confluence-editor">
          <button className="copy-btn" onClick={this.copy}>复制</button>
          <textarea readOnly id="content" className="content" value={confluenceValue} />
        </div>
        <div class="beian"><a target="_blank" href="http://beian.miit.gov.cn">冀ICP备19014774号</a></div>
      </div>
    )
  }
}

export default App;
