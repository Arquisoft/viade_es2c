
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class Prueba2Multi extends Simulation {

	val httpProtocol = http
		.baseUrl("https://maps.googleapis.com")
		.inferHtmlResources()
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:75.0) Gecko/20100101 Firefox/75.0")

	val headers_0 = Map("Accept" -> "text/css,*/*;q=0.1")

	val headers_3 = Map(
		"Accept" -> "text/shex,text/turtle,*/*",
		"Origin" -> "http://localhost")

	val headers_4 = Map("Content-Type" -> "application/json; charset=UTF-8")

	val headers_22 = Map("Accept" -> "image/webp,*/*")

    val uri2 = "https://shexshapes.inrupt.net/public/notifications/core-notification.shex"
    val uri3 = "https://maps.gstatic.com/mapfiles/closedhand_8_8.cur"
    val uri4 = "https://www.googleapis.com/geolocation/v1/geolocate"
    val uri5 = "https://fonts.googleapis.com/css"

	val scn = scenario("Prueba2")
		.exec(http("request_0")
			.get(uri5 + "?family=Raleway:400,400i,700,700i|Roboto:300,300i,400,400i,700,700i")
			.headers(headers_0)
			.resources(http("request_1")
			.get(uri5 + "?family=Raleway:400,400i,700,700i|Roboto:300,300i,400,400i,700,700i")
			.headers(headers_0)))
		.pause(46)
		.exec(http("request_2")
			.get("/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&callback=loaderCB01588755591528&libraries=places&v=3&language=en")
			.resources(http("request_3")
			.get(uri2)
			.headers(headers_3),
            http("request_4")
			.post(uri4 + "?key=AIzaSyAeBuGRUrxHr4_eHhrCwdkl0G-O4qR5UXs")
			.headers(headers_4)
			.body(RawFileBody("/prueba2/0004_request.json"))
			.check(status.is(429)),
            http("request_5")
			.get("/maps/api/js/ViewportInfoService.GetViewportInfo?1m6&1m2&1d37.72589123523062&2d-122.52692133075418&2m2&1d37.82684096576943&2d-122.31199609799413&2u14&4sen&5e0&6sm%40512000000&7b0&8e0&callback=_xdc_._94nqxn&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=65898")))
		.pause(1)
		.exec(http("request_6")
			.get("/maps/api/js/AuthenticationService.Authenticate?1shttp%3A%2F%2Flocalhost%2Fviade_es2c%2F%23%2Fcreateroute&4sAIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&callback=_xdc_._87jcrd&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=71373")
			.resources(http("request_7")
			.get("/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2Flocalhost%2Fviade_es2c%2F%23%2Fcreateroute&3sAIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&7sv426dw&10e1&callback=_xdc_._b1ykr8&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=91655"),
            http("request_8")
			.get(uri2)
			.headers(headers_3)))
		.pause(2)
		.exec(http("request_9")
			.post(uri4 + "?key=AIzaSyAeBuGRUrxHr4_eHhrCwdkl0G-O4qR5UXs")
			.headers(headers_4)
			.body(RawFileBody("/prueba2/0009_request.json"))
			.check(status.is(429)))
		.pause(4)
		.exec(http("request_10")
			.post(uri4 + "?key=AIzaSyAeBuGRUrxHr4_eHhrCwdkl0G-O4qR5UXs")
			.headers(headers_4)
			.body(RawFileBody("/prueba2/0010_request.json"))
			.check(status.is(429)))
		.pause(4)
		.exec(http("request_11")
			.post(uri4 + "?key=AIzaSyAeBuGRUrxHr4_eHhrCwdkl0G-O4qR5UXs")
			.headers(headers_4)
			.body(RawFileBody("/prueba2/0011_request.json"))
			.check(status.is(429)))
		.pause(4)
		.exec(http("request_12")
			.post(uri4 + "?key=AIzaSyAeBuGRUrxHr4_eHhrCwdkl0G-O4qR5UXs")
			.headers(headers_4)
			.body(RawFileBody("/prueba2/0012_request.json"))
			.check(status.is(429)))
		.pause(1)
		.exec(http("request_13")
			.get("/maps/api/js/ViewportInfoService.GetViewportInfo?1m6&1m2&1d37.74092613412358&2d-122.44607325237303&2m2&1d37.81756307094474&2d-122.4215810354508&2u15&4sen&5e0&6sm%40512000000&7b0&8e0&callback=_xdc_._3u673b&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=104939"))
		.pause(1)
		.exec(http("request_14")
			.get("/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2Flocalhost%2Fviade_es2c%2F%23%2Fcreateroute&3sAIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&7sv42my8&10e1&callback=_xdc_._t2wgwz&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=101965")
			.resources(http("request_15")
			.get(uri2)
			.headers(headers_3),
            http("request_16")
			.post(uri4 + "?key=AIzaSyAeBuGRUrxHr4_eHhrCwdkl0G-O4qR5UXs")
			.headers(headers_4)
			.body(RawFileBody("/prueba2/0016_request.json"))
			.check(status.is(429)),
            http("request_17")
			.get("/maps/api/js/ViewportInfoService.GetViewportInfo?1m6&1m2&1d37.743296348664444&2d-122.44212289480492&2m2&1d37.819933285485604&2d-122.4176306778827&2u15&4sen&5e0&6sm%40512000000&7b0&8e0&callback=_xdc_._v0g712&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=42351"),
            http("request_18")
			.get("/maps/api/js/ViewportInfoService.GetViewportInfo?1m6&1m2&1d37.74092613412358&2d-122.43817253723682&2m2&1d37.81756307094474&2d-122.4136803203146&2u15&4sen&5e0&6sm%40512000000&7b0&8e0&callback=_xdc_._d3yec7&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=75348"),
            http("request_19")
			.get("/maps/vt?pb=!1m4!1m3!1i15!2i5240!3i12663!1m4!1m3!1i15!2i5240!3i12664!1m4!1m3!1i15!2i5240!3i12665!1m4!1m3!1i15!2i5240!3i12666!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e3!12m1!5b1&callback=_xdc_._3yy9rr&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=126754"),
            http("request_20")
			.get("/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2Flocalhost%2Fviade_es2c%2F%23%2Fcreateroute&3sAIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&7sv42ow2&10e1&callback=_xdc_._e1uy4d&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=81632"),
            http("request_21")
			.get("/maps/api/js/QuotaService.RecordEvent?1shttp%3A%2F%2Flocalhost%2Fviade_es2c%2F%23%2Fcreateroute&3sAIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&7sv42p58&10e1&callback=_xdc_._mnlchm&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=92937")))
		.pause(4)
		.exec(http("request_22")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5243!3i12665!4i256!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=17793")
			.headers(headers_22)
			.resources(http("request_23")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5243!3i12664!4i256!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=106390")
			.headers(headers_22),
            http("request_24")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5243!3i12663!4i256!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=63916")
			.headers(headers_22),
            http("request_25")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5243!3i12666!4i256!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=60267")
			.headers(headers_22),
            http("request_26")
			.get("/maps/vt?pb=!1m4!1m3!1i15!2i5237!3i12663!1m4!1m3!1i15!2i5238!3i12663!1m4!1m3!1i15!2i5239!3i12663!1m4!1m3!1i15!2i5237!3i12664!1m4!1m3!1i15!2i5237!3i12665!1m4!1m3!1i15!2i5237!3i12666!1m4!1m3!1i15!2i5238!3i12664!1m4!1m3!1i15!2i5238!3i12665!1m4!1m3!1i15!2i5239!3i12664!1m4!1m3!1i15!2i5239!3i12665!1m4!1m3!1i15!2i5238!3i12666!1m4!1m3!1i15!2i5239!3i12666!1m4!1m3!1i15!2i5241!3i12663!1m4!1m3!1i15!2i5242!3i12663!1m4!1m3!1i15!2i5243!3i12663!1m4!1m3!1i15!2i5241!3i12664!1m4!1m3!1i15!2i5241!3i12665!1m4!1m3!1i15!2i5241!3i12666!1m4!1m3!1i15!2i5242!3i12664!1m4!1m3!1i15!2i5242!3i12665!1m4!1m3!1i15!2i5243!3i12664!1m4!1m3!1i15!2i5243!3i12665!1m4!1m3!1i15!2i5242!3i12666!1m4!1m3!1i15!2i5243!3i12666!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e3!12m1!5b1&callback=_xdc_._ceilbc&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=39354"),
            http("request_27")
			.get("/maps/api/js/ViewportInfoService.GetViewportInfo?1m6&1m2&1d37.7401523667587&2d-122.50987524146264&2m2&1d37.81832065187726&2d-122.34093088330317&2u15&4sen&5e0&6sm%40512000000&7b0&8e0&callback=_xdc_._act1mf&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=5653"),
            http("request_28")
			.get(uri3)
			.headers(headers_22),
            http("request_29")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5242!3i12667!4i256!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=26694")
			.headers(headers_22),
            http("request_30")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5241!3i12667!4i256!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=81718")
			.headers(headers_22),
            http("request_31")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5240!3i12667!4i256!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=5671")
			.headers(headers_22),
            http("request_32")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5239!3i12667!4i256!2m3!1e0!2sm!3i512226556!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=108907")
			.headers(headers_22),
            http("request_33")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5243!3i12667!4i256!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=102741")
			.headers(headers_22),
            http("request_34")
			.get("/maps/vt?pb=!1m5!1m4!1i15!2i5238!3i12667!4i256!2m3!1e0!2sm!3i512226556!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e0&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=32860")
			.headers(headers_22),
            http("request_35")
			.get("/maps/vt?pb=!1m4!1m3!1i15!2i5238!3i12667!1m4!1m3!1i15!2i5239!3i12667!1m4!1m3!1i15!2i5240!3i12667!1m4!1m3!1i15!2i5241!3i12667!1m4!1m3!1i15!2i5242!3i12667!1m4!1m3!1i15!2i5243!3i12667!2m3!1e0!2sm!3i512226568!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjJ8cy5lOmx8cC52Om9mZg!4e3!12m1!5b1&callback=_xdc_._6zr3tk&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&token=68956")))

	setUp(scn.inject(atOnceUsers(100))).protocols(httpProtocol)
}
