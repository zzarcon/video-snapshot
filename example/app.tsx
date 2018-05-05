import * as React from 'react';
import {Component} from 'react';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';
import CameraFilledIcon from '@atlaskit/icon/glyph/camera-filled';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import Button from '@atlaskit/button';
import VideoSnapshot from '../src';
import {PlayIconWrapper, VideoWrapper, AppWrapper, VideoPreview, PreviewWrapper, ActionsWrapper, Preview, FileInput} from './styled';

// TODO: render video element
// TODO: render download button

export interface AppProps {

}

export interface AppState {
  currentTime: number;
  videoPreview?: string;
  videoUrl?: string;
}
export default class App extends Component<AppProps, AppState> {
  inputRef: HTMLInputElement;
  snapshoter: VideoSnapshot;

  state: AppState = {
    currentTime: 0,
  }
  
  onChange = async (e: any) => {
    const files = e.target.files;
    const videoFile = files[0];
    const videoUrl = URL.createObjectURL(videoFile);
    this.snapshoter = new VideoSnapshot(videoFile);
    const videoPreview = await this.snapshoter.takeSnapshot();
    
    this.setState({
      videoUrl,
      videoPreview
    });
  }
  
  pickFile = () => {
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

  renderVideo() {
    const {videoUrl} = this.state;

    return (
      <VideoWrapper>
        {videoUrl ? 
          <VideoPreview src={videoUrl} controls autoPlay /> :
          <PlayIconWrapper onClick={this.pickFile}>
            <VidPlayIcon label="video" size="xlarge" />
          </PlayIconWrapper>
        }
      </VideoWrapper>
    );
  }
  
  downloadSnapshot = () => {

  }

  render() {
    const {videoPreview} = this.state;
    const hasPreview = !!videoPreview;
    const img = videoPreview ? <Preview src={videoPreview} /> : null;
    
    return (
      <AppWrapper>
        {this.renderVideo()}
        <ActionsWrapper>
          <Button appearance="primary" onClick={this.pickFile} iconAfter={<AttachmentIcon label="file" />}>
            Pick file
          </Button>
          <FileInput innerRef={this.saveInputRef} type="file" onChange={this.onChange} />
          <Button 
            appearance="primary"
            onClick={this.onSnapshot}
            iconAfter={<CameraFilledIcon label="photo" />}
            isDisabled={!hasPreview}
          >
            Take snapshot
          </Button>
          <Button 
            appearance="primary"
            onClick={this.downloadSnapshot}
            iconAfter={<DownloadIcon label="download" />}
            isDisabled={!hasPreview}
          >
            Download
          </Button>
        </ActionsWrapper>
        <PreviewWrapper>
          {img}
        </PreviewWrapper>        
      </AppWrapper>
    );
  }
}