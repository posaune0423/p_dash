import { useState } from 'react'
import './styles.css'
import { cn } from '@/utils'

type Props = {
  open: boolean
  appName: string
  appDescription: string
  handleCloseClick: () => void
}

const InstructionDrawer = ({ open, appName, appDescription, handleCloseClick }: Props) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn('slide-in w-full h-auto z-10', open ? 'fixed bottom-0 left-0' : 'hidden slide-out')}
    >
      <aside id="pwa-install-element">
        <article className={`install-dialog apple available dialog-body ${collapsed || 'how-to'}`}>
          <div className="icon">
            <img alt="icon" className="icon-image" draggable="false" src="/icon.svg" />
          </div>
          <button type="button" title="close" className="close" onClick={handleCloseClick}>
            <svg viewBox="0 0 24 24">
              <path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z" />
            </svg>
          </button>
          <div className="about">
            <div className="name">{appName}</div>
            <div className="description">{appDescription}</div>
          </div>
          <div className="welcome-to-install">
            This site has app functionality. Add it to your Home Screen for extensive experience and easy access.
          </div>
          <div className="how-to-body">
            <div className="how-to-description">
              <div className="description-step">
                <div className="svg-wrap">
                  <svg id="pwa-safari" viewBox="0 0 20.283 19.932" width="24" height="24">
                    <g fill="currentColor">
                      <path d="M9.96 19.922c5.45 0 9.962-4.522 9.962-9.961C19.922 4.51 15.4 0 9.952 0 4.511 0 0 4.512 0 9.96c0 5.44 4.521 9.962 9.96 9.962Zm0-1.66A8.26 8.26 0 0 1 1.67 9.96c0-4.61 3.672-8.3 8.281-8.3 4.61 0 8.31 3.69 8.31 8.3 0 4.61-3.69 8.3-8.3 8.3Z" />
                      <path d="m5.87 14.883 5.605-2.735a1.47 1.47 0 0 0 .683-.673l2.725-5.596c.312-.664-.166-1.182-.85-.84L8.447 7.764c-.302.136-.508.341-.674.673L5.03 14.043c-.312.645.196 1.152.84.84Zm4.09-3.72A1.19 1.19 0 0 1 8.77 9.97c0-.664.527-1.201 1.19-1.201a1.2 1.2 0 0 1 1.202 1.2c0 .655-.537 1.192-1.201 1.192Z" />
                    </g>
                  </svg>
                </div>
                <div className="step-text">1) Open in Safari browser</div>
              </div>
              <div className="description-step">
                <div className="svg-wrap">
                  <svg id="pwa-share" width="25" height="32" viewBox="0 0 17.695 26.475">
                    <g fill="currentColor">
                      <path d="M17.334 10.762v9.746c0 2.012-1.025 3.027-3.066 3.027H3.066C1.026 23.535 0 22.52 0 20.508v-9.746C0 8.75 1.025 7.734 3.066 7.734h2.94v1.573h-2.92c-.977 0-1.514.527-1.514 1.543v9.57c0 1.015.537 1.543 1.514 1.543h11.152c.967 0 1.524-.527 1.524-1.543v-9.57c0-1.016-.557-1.543-1.524-1.543h-2.91V7.734h2.94c2.04 0 3.066 1.016 3.066 3.028Z" />
                      <path d="M8.662 15.889c.42 0 .781-.352.781-.762V5.097l-.058-1.464.654.693 1.484 1.582a.698.698 0 0 0 .528.235c.4 0 .713-.293.713-.694 0-.205-.088-.361-.235-.508l-3.3-3.183c-.196-.196-.362-.264-.567-.264-.195 0-.361.069-.566.264L4.795 4.94a.681.681 0 0 0-.225.508c0 .4.293.694.703.694.186 0 .4-.079.538-.235l1.474-1.582.664-.693-.058 1.465v10.029c0 .41.351.762.771.762Z" />
                    </g>
                  </svg>
                </div>
                <div className="step-text">2) Press Share in Navigation bar</div>
              </div>
              <div className="description-step">
                <div className="svg-wrap">
                  <svg id="pwa-add" width="25" height="25">
                    <g>
                      <path d="m23.40492,1.60784c-1.32504,-1.32504 -3.19052,-1.56912 -5.59644,-1.56912l-10.65243,0c-2.33622,0 -4.2017,0.24408 -5.5267,1.56912c-1.32504,1.34243 -1.56911,3.17306 -1.56911,5.50924l0,10.5827c0,2.40596 0.22665,4.254 1.55165,5.57902c1.34246,1.32501 3.19052,1.5691 5.59647,1.5691l10.60013,0c2.40592,0 4.2714,-0.24408 5.59644,-1.5691c1.325,-1.34245 1.55166,-3.17306 1.55166,-5.57902l0,-10.51293c0,-2.40596 -0.22666,-4.25401 -1.55166,-5.57901zm-0.38355,5.21289l0,11.24518c0,1.51681 -0.20924,2.94643 -1.02865,3.78327c-0.83683,0.83685 -2.30134,1.0635 -3.81815,1.0635l-11.33234,0c-1.51681,0 -2.96386,-0.22665 -3.80073,-1.0635c-0.83683,-0.83684 -1.04607,-2.26646 -1.04607,-3.78327l0,-11.19288c0,-1.5517 0.20924,-3.01617 1.02865,-3.85304c0.83687,-0.83683 2.31876,-1.04607 3.87042,-1.04607l11.28007,0c1.51681,0 2.98132,0.22666 3.81815,1.06353c0.81941,0.81941 1.02865,2.26645 1.02865,3.78327zm-10.53039,12.08205c0.64506,0 1.02861,-0.43586 1.02861,-1.13326l0,-4.34117l4.53294,0c0.66252,0 1.13326,-0.36613 1.13326,-0.99376c0,-0.64506 -0.43586,-1.02861 -1.13326,-1.02861l-4.53294,0l0,-4.53294c0,-0.6974 -0.38355,-1.13326 -1.02861,-1.13326c-0.62763,0 -0.99376,0.45332 -0.99376,1.13326l0,4.53294l-4.51552,0c-0.69737,0 -1.15069,0.38355 -1.15069,1.02861c0,0.62763 0.48817,0.99376 1.15069,0.99376l4.51552,0l0,4.34117c0,0.66252 0.36613,1.13326 0.99376,1.13326z" />
                    </g>
                  </svg>
                </div>
                <div className="step-text">3) Press Add to Home Screen</div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="dialog-button button install" onClick={() => setCollapsed((prev) => !prev)}>
              <span className="button-text show">Hide Instruction</span>
            </button>
          </div>
        </article>
      </aside>
    </div>
  )
}

export default InstructionDrawer
