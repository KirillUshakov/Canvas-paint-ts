<template>
  <div class="home">
    <div class="container">

      <div class="paint">
        <div class="paint__panel">
          <div class="paint__tools">
            <button class="paint__tool btn">
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path fill="#444" d="M8 0h1v16h-1v-16z"></path>
              </svg>
            </button>
            <button class="paint__tool btn">
              <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="32px" height="32px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
              <path class="linesandangles_een" style="fill:#111918;" d="M21,12.17V6c0-1.206-0.799-3-3-3s-3,1.794-3,3v2.021L10.054,13H6c-1.105,0-2,0.895-2,2v9h2v-7
                l12,12l10-10L21,12.17z M18,5c0.806,0,0.988,0.55,1,1v4.17l-2-2V6.012C17.012,5.55,17.194,5,18,5z M18,26l-9-9l6-6v6h2v-6.001L25,19
                L18,26z M4,26h2v2H4V26z"/>
              </svg>
            </button>
            <button class="paint__tool btn">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
                <rect x="25.001" y="442.68" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -267.1371 842.702)" style="fill:#082947;" width="31.919" height="67.993"/>
                <polygon style="fill:#98D9D5;" points="126.42,436.352 72.518,490.255 49.955,467.692 96.334,406.266 "/>
                <polygon style="fill:#C1E8E6;" points="103.858,413.789 49.955,467.692 27.393,445.114 81.288,391.219 "/>
                <polygon style="fill:#185F8D;" points="171.576,300.931 96.342,421.305 133.951,458.93 224.239,368.642 "/>
                <path style="fill:#4284B2;" d="M96.342,421.305c-0.007,0.007-37.624-37.624-37.624-37.624l90.288-90.273l45.14,30.093
                  L96.342,421.305z"/>
                <polygon style="fill:#6DA8D6;" points="306.988,195.612 186.622,331.025 231.762,376.165 352.128,255.799 "/>
                <polygon style="fill:#9EC8E8;" points="314.512,203.136 186.622,331.025 149.005,293.408 141.482,285.885 261.855,165.511 "/>
                <polygon style="fill:#185F8D;" points="449.939,157.988 352.128,255.799 306.988,210.659 401.03,86.524 453.694,139.187 "/>
                <polygon style="fill:#082947;" points="506.364,101.563 472.509,135.418 453.694,139.187 408.553,94.047 461.217,56.43 "/>
                <polygon style="fill:#4284B2;" points="416.076,101.57 306.988,210.659 261.855,165.511 370.944,56.438 "/>
                <polygon style="fill:#274B6D;" points="461.217,56.43 416.076,101.57 370.944,56.438 416.076,11.29 "/>
                <polygon style="fill:#98D9D5;" points="227.999,154.229 205.428,131.659 337.087,0 472.507,135.42 449.937,157.99 337.087,45.14 "/>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div class="paint__board">
          <canvas ref="canvas" class="paint__canvas"></canvas>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
  .home {
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .paint {
    display: flex;
    flex-direction: column;

    &__panel {
      margin-bottom: 2rem;

      display: flex;
      flex-wrap: wrap;
    }

    &__tools {
      display: flex;
      flex-wrap: wrap;

      gap: 0.5rem;
    }

    &__tool {
      cursor: pointer;

      position: relative;
      width: 50px;
      height: 50px;

      background-color: $white;
      border: 1px solid $light-grey;
      border-radius: 1rem;

      transition: all .3s;

      svg {
        position: absolute;
        left: 50%;
        top: 50%;

        width: 60%;
        height: 60%;

        object-fit: contain;
        object-position: center;

        transform: translate(-50%, -50%);
        transition: all .3s;
      }

      &:hover {
        background-color: $primary;

        svg {
          filter: brightness(0) invert(1);
        }
      }
    }

    &__board {
      position: relative;

      width: 100%;
      padding-top: 56.7%;

      border: 1px solid $light-grey;
      border-radius: 1rem;
    }

    &__canvas {
      position: absolute;
      left: 0;
      top: 0;

      width: 100%;
      height: 100%;
    }
  }
</style>
