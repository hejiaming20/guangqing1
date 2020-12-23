/*
 * @Author: your name
 * @Date: 2020-09-08 16:44:12
 * @LastEditTime: 2020-09-08 16:47:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \www_admin_masterd:\vue项目\BRSS-web-project\components\Base\Edge.js
 */
class Edge {
  constructor(
    id,
    source,
    target,
    controlPoints,
    sourceAnchor,
    targetAnchor,
    shape,
    style,
    label
  ) {
    this.id = id
    this.source = source
    this.target = target
    this.controlPoints = controlPoints
    this.sourceAnchor = sourceAnchor
    this.targetAnchor = targetAnchor
    this.shape = shape
    this.style = style
    this.label = label
  }
}
export default Edge
