<!--
 * @Author: your name
 * @Date: 2020-11-28 17:50:59
 * @LastEditTime: 2020-12-07 15:53:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \BRSS-web-project\components\pdfneed\index.vue
-->

<script>
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue, options) {
    Vue.prototype.getPdf = function() {
      var title = this.htmlTitle
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true
      }).then(function(canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height

        let pageHeight = (contentWidth / 841.89) * 592.28
        let leftHeight = contentHeight

        let position = 0

        let imgWidth = 841.89
        let imgHeight = (841.89 / contentWidth) * contentHeight

        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('l', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 592.28
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      })
    }
  }
}
</script>

<style scoped>
</style>
