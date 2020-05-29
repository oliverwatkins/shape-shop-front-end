import * as React from 'react';


export class Footer extends React.PureComponent {
	render() {

		let style = {

		}



		return (
			<div className="container">
				<div className="ce_bs_gridStart mt-30 first row">
					<div className="col-sm-6 col-md-3">
						<div className="ce_hyperlink karte">
							<a href="xx.html" className="hyperlink_txt btn btn-osteria btn-lg cboxElement"
								 title="MITTAGSKARTE" data-lightbox="" rel="mittagskart" target="_blank">MITTAGSKARTE</a>
						</div>
					</div>
					<div className="ce_bs_gridSeparator col-sm-6 col-md-3">
						<div className="ce_hyperlink karte">
							<a href="xx.html" className="hyperlink_txt btn btn-osteria btn-lg cboxElement"
								 title="ZUM MITNEHMEN STANDARD" data-lightbox="" rel="standardkarte" target="_blank">ZUM MITNEHMEN
								STANDARD</a>
						</div>
					</div>
					<div className="ce_bs_gridSeparator col-sm-6 col-md-3">
						<div className="ce_hyperlink karte">
							<a href="xx.html" className="hyperlink_txt btn btn-osteria btn-lg cboxElement"
								 title="ZUM MITNEHMEN HEUTE" data-lightbox="" rel="monatskarte" target="_blank">ZUM MITNEHMEN HEUTE</a>
						</div>
					</div>
					<div className="ce_bs_gridSeparator col-sm-6 col-md-3">
						<div className="ce_hyperlink karte">
							<a href="mitnahmekarte.html" className="hyperlink_txt btn btn-osteria btn-lg cboxElement"
								 title="NEU! -  LIEFERUNG" data-lightbox="" rel="lieferung" target="_blank">NEU! - LIEFERUNG</a>
						</div>
					</div>
				</div>
				<div className="ce_text text-center mb-4 mt-4 block">


					<p style={{textAlign: "center"}}>täglich 12.00 - 21.00 Uhr: Mitnehmen</p>
					<p style={{textAlign: "center"}}>täglich 18.00 - 21.00 Uhr: Liefern</p>
					<p style={{textAlign: "center"}}>Wein vom "Weinberg" gegenüber gibt es bei uns zum Ladenverkaufspreis.</p>


				</div>
				<div className="ce_text text-center last block">
					<p>.</p>
				</div>
			</div>
		);
	}
}
export default Footer;