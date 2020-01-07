import React from 'react'
import { connect } from 'react-redux'
import { map } from 'lodash'
import {
  Segment,
  Dimmer,
  Header,
  Image,
  Button,
  Icon,
  Modal,
  Placeholder
} from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'

import { DefaultDP, CustomCropper, ifRole, getTheme } from 'formula_one'
import { setDisplayPicture } from '../../actions'

import inline from 'formula_one/src/css/inline.css'
import blocks from '../../css/edit-profile.css'

class ProfileCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeProfileDimmer: false,
      cropperDisplay: false,
      crop: {
        aspect: 1
      },
      removerDisplay: false
    }
  }
  handleShowProfileDimmer = () => {
    this.setState({ activeProfileDimmer: true })
  }
  handleHideProfileDimmer = () => this.setState({ activeProfileDimmer: false })
  handleCloseModal = () => {
    this.setState({
      fileSrc: '',
      crop: { aspect: 1 },
      activeProfileDimmer: false,
      fileToSend: ''
    })
  }
  handleRemoverOpenModal = () => {
    this.setState({
      removerDisplay: true,
      activeProfileDimmer: false
    })
  }
  handleRemoverCloseModal = () => {
    this.setState({
      removerDisplay: false,
      activeProfileDimmer: false
    })
  }
  fileChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        this.setState({
          fileSrc: reader.result,
          crop: { aspect: 1 }
        })
      )
      reader.readAsDataURL(e.target.files[0])
      this.setState({
        fileName: e.target.files[0].name,
        removerDisplay: false
      })
      e.target.value = ''
    }
  }
  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image
  }
  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop)
  }
  onCropChange = crop => {
    this.setState({ crop })
  }
  async makeClientCrop (crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        this.state.fileName
      )
      this.setState({ croppedImageUrl })
    }
  }

  getCroppedImg (image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas')
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          // reject(new Error('Canvas is empty'));
          return
        }
        blob.name = fileName
        window.URL.revokeObjectURL(this.fileUrl)
        this.fileUrl = window.URL.createObjectURL(blob)
        this.setState({
          fileToSend: blob
        })
        resolve(this.fileUrl)
      }, 'image/jpeg')
    })
  }
  uploadImage = () => {
    const formData = new FormData()
    formData.append(
      'display_picture',
      this.state.fileToSend,
      this.state.fileName
    )
    this.props.SetDisplayPicture(
      formData,
      this.successCallback,
      this.errCallback
    )
  }
  removeImage = () => {
    this.props.SetDisplayPicture({ display_picture: null })
  }
  successCallback = res => {
    this.setState({
      error: false,
      message: '',
      fileSrc: false,
      fileToSend: ''
    })
  }
  errCallback = err => {
    this.setState({
      error: true,
      message: err.response.data
    })
  }

  renderRole = () => {
    const { whoAmI } = this.props
    const { data } = whoAmI
    if (ifRole(data.roles, 'Maintainer') !== 'NOT_ROLE') {
      const maintainer = data.roles.find(x => x.role === 'Maintainer')
      return (
        <React.Fragment>
          {`${maintainer.data.designation}, ${maintainer.data.post}`}
        </React.Fragment>
      )
    } else if (ifRole(data.roles, 'Faculty') !== 'NOT_ROLE') {
      const faculty = data.roles.find(x => x.role === 'Faculty')
      return (
        <React.Fragment>{faculty.data.branch.department.name}</React.Fragment>
      )
    } else if (ifRole(data.roles, 'Student') !== 'NOT_ROLE') {
      const student = data.roles.find(x => x.role === 'Student')
      return (
        <React.Fragment>
          {`${student.data.branch.name}, 
            ${student.data.branch.department.name}`}
        </React.Fragment>
      )
    }
  }

  render () {
    const { whoAmI } = this.props
    const { activeProfileDimmer, inEditMode, fileSrc, crop } = this.state
    console.log(fileSrc)
    return (
      <div styleName='blocks.profile-card-wrapper'>
        <Modal
          open={Boolean(fileSrc)}
          centered
          size='tiny'
          closeIcon
          onClose={this.handleCloseModal}
          closeOnDimmerClick={false}
        >
          <Header>Crop profile picture</Header>
          <Modal.Content>
            <p>
              You want to drag over the region of the image you want to keep. You
              can move or resize the area. Click on <strong>Done</strong> to
              confirm.
            </p>
            <div styleName='blocks.image-preview'>
              <CustomCropper
                src={fileSrc}
                crop={crop}
                onClose={this.handleHideProfileDimmer}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              icon='left arrow'
              content='Keep current'
              secondary
              onClick={this.handleCloseModal}
            />
            <Button
              basic
              icon='photo'
              content='Done'
              primary
              onClick={this.uploadImage}
            />
          </Modal.Actions>
        </Modal>
        <Segment color={getTheme()}>
          <div
            styleName={`${
              isMobile
                ? 'blocks.profile-card-mobile'
                : 'blocks.profile-card-desktop'
            }`}
          >
            <Dimmer.Dimmable
              dimmed={activeProfileDimmer}
              onMouseEnter={this.handleShowProfileDimmer}
              onMouseLeave={this.handleHideProfileDimmer}
            >
              {whoAmI.loaded ? (
                whoAmI.data.displayPicture ? (
                  <Image
                    src={whoAmI.data.displayPicture}
                    circular
                    styleName='blocks.display-avatar'
                  />
                ) : (
                  <DefaultDP
                    name={
                      whoAmI.loaded && whoAmI.data.fullName
                        ? whoAmI.data.fullName.toUpperCase()
                        : ''
                    }
                    size='5em'
                    gravatarHash={whoAmI.loaded && whoAmI.data.gravatarHash}
                  />
                )
              ) : (
                <Placeholder style={{ width: '5em', height: '5em' }}>
                  <Placeholder.Image square />
                </Placeholder>
              )}
              <Dimmer
                active={activeProfileDimmer}
                style={{ borderRadius: '9999em' }}
              >
                {inEditMode === 'profile' ? (
                  <Loader active={inEditMode === 'profile'} />
                ) : (
                  <React.Fragment>
                    {whoAmI.data.displayPicture && (
                      <Modal
                        trigger={
                          <Icon
                            name='erase'
                            bordered
                            link
                            onClick={this.handleRemoverOpenModal}
                          />
                        }
                        open={this.state.removerDisplay}
                        onClose={this.handleRemoverCloseModal}
                        size='mini'
                        closeIcon
                      >
                        <Header>Are you sure?</Header>
                        <Modal.Content>
                          Are you sure you want to continue this irreversible
                          action?
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                            basic
                            icon='left arrow'
                            content='Keep'
                            positive
                            onClick={this.handleRemoverCloseModal}
                          />
                          <Button
                            basic
                            icon='trash alternate'
                            content='Delete'
                            negative
                            onClick={this.removeImage}
                          />
                        </Modal.Actions>
                      </Modal>
                    )}
                    <label htmlFor='profile'>
                      <Icon name='pencil' link />
                    </label>
                    <input
                      type='file'
                      onChange={this.fileChange}
                      name='profile'
                      id='profile'
                      accept='image/*'
                      styleName='inline.display-none'
                    />
                  </React.Fragment>
                )}
              </Dimmer>
            </Dimmer.Dimmable>
            <div
              styleName={`blocks.display-desc ${
                isMobile ? 'blocks.text-align-center' : ''
              }`}
            >
              {whoAmI.loaded ? (
                <div>
                  <Header as='h3' styleName='blocks.display-desc-header'>
                    {whoAmI.data.fullName}
                    <Header.Subheader>
                      <p>{map(whoAmI.data.roles, 'role').join(', ')}</p>
                      {this.renderRole()}
                    </Header.Subheader>
                  </Header>
                </div>
              ) : (
                <Placeholder>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='short' />
                    <Placeholder.Line length='medium' />
                    <Placeholder.Line length='long' />
                  </Placeholder.Paragraph>
                </Placeholder>
              )}
            </div>
          </div>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    whoAmI: state.whoAmI
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SetDisplayPicture: (formData, successCallback, errCallback) => {
      dispatch(setDisplayPicture(formData, successCallback, errCallback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCard)
