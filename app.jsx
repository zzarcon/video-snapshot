import React, {Component} from 'react';
import VideoSnapshot from 'video-snapshot';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import {PreviewWrapper, TimeWrapper, ActionsWrapper, Preview, FileInput} from './styled';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.saveInputRef = this.saveInputRef.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onSnapshot = this.onSnapshot.bind(this);

    this.state = {
      currentTime: ''
    };
  }
  
  async onChange(e) {
    const files = e.target.files;
    this.snapshoter = new VideoSnapshot(files[0]);
    const videoPreview = await this.snapshoter.takeSnapshot();
    
    this.setState({
      videoPreview
    });
  }
  
  onClick() {
    this.inputRef.click();
  }

  async onSnapshot(e) {
    const {currentTime} = this.state;
    const videoPreview = await this.snapshoter.takeSnapshot(currentTime);
    
    this.setState({
      videoPreview
    });
  }

  saveInputRef(e) {
    if (!e) return

    this.inputRef = e;
  }

  onTimeChange(e) {
    this.setState({
      currentTime: e.target.value
    });
  }

  render() {
    const {videoPreview, currentTime} = this.state;
    const hasPreview = !!videoPreview;
    const img = videoPreview ? <Preview src={videoPreview} /> : null;
    
    return (
      <div>
        <ActionsWrapper>
          <Button appearance="primary" onClick={this.onClick} >Pick file</Button>
          <FileInput innerRef={this.saveInputRef} type="file" onChange={this.onChange} />
          {
            hasPreview ? 
            <TimeWrapper>
              <FieldText 
                value={currentTime}
                compact={true}
                isLabelHidden={true}
                placeholder="snapshot time 00:00"
                onChange={this.onTimeChange}
              />
              <Button appearance="primary" onClick={this.onSnapshot} >Take snapshot</Button>
            </TimeWrapper>
            : null
          } 
        </ActionsWrapper>
        <PreviewWrapper>
          {img}
        </PreviewWrapper>
      </div>
    );
  }
}