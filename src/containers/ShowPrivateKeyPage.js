import React from 'react'

import { Page, Toolbar, ToolbarButton, BackButton, Button, Input, Icon} from 'react-onsenui'

import QRCode from 'qrcode.react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { ZENCASH_MOBILE_SAVE_PATH, readFromFile, writeToFile } from '../utils/persistentStorage'
import { phraseToSecretItems } from '../utils/wallet'

import TRANSLATIONS from '../translations'

class ShowPrivateKeyPage extends React.Component {
  gotoComponent (c) {
    this.props.navigator.pushPage({component: c})
    this.setState({
      sliderOpen: false
    })
  }

  renderToolbar () {
    const CUR_LANG = this.props.settings.language

    return (
      <Toolbar>
        <div className='left'>
          <BackButton onClick={() => this.props.navigator.popPage()}>
            Back
          </BackButton>
        </div>
        <div className='center'>
          { TRANSLATIONS[CUR_LANG].ShowPrivateKeyPage.title }
        </div>
      </Toolbar>
    )
  }

  render () {
    const CUR_LANG = this.props.settings.language

    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <hr/>
        {
          this.props.secrets.items.map(function(i){
            return (
              <div>
                <ons-row style={{textAlign: 'center'}}>
                  <ons-col>
                    <p>
                      { TRANSLATIONS[CUR_LANG].General.privateKey }<br/>
                      <QRCode value={i.privateKey} />
                    </p>
                    <p style={{fontSize: '12px'}}>                      
                      <textarea disabled value={i.privateKey}></textarea>
                    </p>
                  </ons-col>
                  <ons-col>
                    <p>
                    { TRANSLATIONS[CUR_LANG].General.address }<br/>
                      <QRCode value={i.address} />
                    </p> 
                    <p style={{fontSize: '12px'}}>                    
                      <textarea disabled value={i.address}></textarea>                    
                    </p>                         
                  </ons-col>                
                </ons-row>
                <hr/>
              </div>            
            )
          })
        }        
      </Page>
    )
  }
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(ShowPrivateKeyPage)
