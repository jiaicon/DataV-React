import React, { useMemo, forwardRef, useRef } from 'react'

import PropTypes from 'prop-types'

import classnames from 'classnames'

import { deepMerge } from '@jiaminghi/charts/lib/util/index'
import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'

import { useSize } from 'ahooks';

import './style.less'

const defaultColor = ['#3faacb', '#fff']

const Decoration = forwardRef(({ reverse = false, dur = 6, className, style, color = [] }, ref) => {
  const domRef = useRef();
  const size = useSize(domRef);
  const width = size ? size.width : 0;
  const height = size ? size.height : 0;

  function calcSVGData() {
    return reverse
      ? { w: 1, h: height, x: width / 2, y: 0 }
      : { w: width, h: 1, x: 0, y: height / 2 }
  }

  const mergedColor = useMemo(() => deepMerge(deepClone(defaultColor, true), color || []), [color])

  const { x, y, w, h } = useMemo(calcSVGData, [reverse, width, height])

  const classNames = useMemo(() => classnames('dv-decoration-2', className), [
    className
  ])

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg width={`${width}px`} height={`${height}px`}>
        <rect x={x} y={y} width={w} height={h} fill={mergedColor[0]}>
          <animate
            attributeName={reverse ? 'height' : 'width'}
            from='0'
            to={reverse ? height : width}
            dur={`${dur}s`}
            calcMode='spline'
            keyTimes='0;1'
            keySplines='.42,0,.58,1'
            repeatCount='indefinite'
          />
        </rect>

        <rect x={x} y={y} width='1' height='1' fill={mergedColor[1]}>
          <animate
            attributeName={reverse ? 'y' : 'x'}
            from='0'
            to={reverse ? height : width}
            dur={`${dur}s`}
            calcMode='spline'
            keyTimes='0;1'
            keySplines='0.42,0,0.58,1'
            repeatCount='indefinite'
          />
        </rect>
      </svg>
    </div>
  )
})

Decoration.propTypes = {
  dur: PropTypes.number,
  reverse: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array
}

// ?????? props ???????????????
Decoration.defaultProps = {
  reverse: false,
  dur: 6
}

export default Decoration
