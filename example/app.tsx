import * as React from 'react';
import {Component} from 'react';
import VideoSnapshot from '../src';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import {PreviewWrapper, TimeWrapper, ActionsWrapper, Preview, FileInput} from './styled';

// TODO: render video element
// TODO: render download button

export interface AppProps {

}

export interface AppState {
  currentTime: number;
  videoPreview?: string;
}
export default class App extends Component<AppProps, AppState> {
  inputRef: HTMLInputElement;
  snapshoter: VideoSnapshot;

  state: AppState = {
    currentTime: 0,
  }
  
  onChange = async (e: any) => {
    const files = e.target.files;
    this.snapshoter = new VideoSnapshot(files[0]);
    const videoPreview = await this.snapshoter.takeSnapshot();
    
    this.setState({
      videoPreview
    });
  }
  
  onClick = () => {
    this.inputRef.click();
  }

  onSnapshot = async (e: any) => {
    const {currentTime} = this.state;
    const videoPreview = await this.snapshoter.takeSnapshot(currentTime);
    
    this.setState({
      videoPreview
    });
  }

  saveInputRef = (e: any) => {
    if (!e) return

    this.inputRef = e;
  }

  onTimeChange = (e: any) => {
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
                value={`${currentTime}`}
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