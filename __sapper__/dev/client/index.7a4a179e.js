import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, g as goto, e as element, t as text, a as space, c as create_component, b as claim_element, f as children, h as claim_text, j as detach_dev, k as claim_space, l as claim_component, m as attr_dev, n as add_location, o as insert_dev, p as append_dev, q as mount_component, r as noop, u as transition_in, w as transition_out, x as destroy_component } from './client.ba923689.js';
import { G as Geocoder } from './Geocoder.72cb9649.js';

/* src/routes/index.svelte generated by Svelte v3.30.1 */
const file = "src/routes/index.svelte";

function create_fragment(ctx) {
	let section0;
	let div0;
	let h1;
	let t0;
	let t1;
	let p0;
	let strong;
	let t2;
	let t3;
	let t4;
	let section1;
	let div7;
	let div6;
	let div1;
	let figure;
	let img;
	let img_src_value;
	let t5;
	let div5;
	let form;
	let geocoder;
	let t6;
	let div4;
	let div3;
	let div2;
	let select;
	let option0;
	let t7;
	let option1;
	let t8;
	let t9;
	let p1;
	let button;
	let t10;
	let t11;
	let section2;
	let div8;
	let h2;
	let t12;
	let t13;
	let p2;
	let t14;
	let current;

	geocoder = new Geocoder({
			props: { id: "home-search", geolocator: true },
			$$inline: true
		});

	geocoder.$on("geocode", /*navigateToCoords*/ ctx[0]);

	const block = {
		c: function create() {
			section0 = element("section");
			div0 = element("div");
			h1 = element("h1");
			t0 = text("Producteurs d'à côté");
			t1 = space();
			p0 = element("p");
			strong = element("strong");
			t2 = text("Trouver des produits fermiers à côté de chez vous.");
			t3 = text("Une carte vous permet de\n      localiser facilement tous les points de vente de produits agricoles locaux accessibles sur les\n      plateformes de nos partenaires.");
			t4 = space();
			section1 = element("section");
			div7 = element("div");
			div6 = element("div");
			div1 = element("div");
			figure = element("figure");
			img = element("img");
			t5 = space();
			div5 = element("div");
			form = element("form");
			create_component(geocoder.$$.fragment);
			t6 = space();
			div4 = element("div");
			div3 = element("div");
			div2 = element("div");
			select = element("select");
			option0 = element("option");
			t7 = text("Select dropdown");
			option1 = element("option");
			t8 = text("With options");
			t9 = space();
			p1 = element("p");
			button = element("button");
			t10 = text("Search");
			t11 = space();
			section2 = element("section");
			div8 = element("div");
			h2 = element("h2");
			t12 = text("Notre démarche en toute transparence");
			t13 = space();
			p2 = element("p");
			t14 = text("Cette plateforme est le fruit d'un partenariat entre les chambres d'agriculture et le\n      ministère de l'Agriculture et de l'Alimentation ouvert à toutes les plateformes de vente\n      directe de produits agricoles. Tous ensemble nous avons souhaité unir nos forces pour offrir\n      un point d'entrée unique aux consommateurs facilitant la recherche de produits fermiers de\n      proximité et une visibilité renforcée aux agricultrices et agriculteurs adhérents des\n      plateformes partenaires. Nous partageons l'objectif de favoriser les produits locaux car si\n      l'on on veut que notre agriculture reste française, que nos agriculteurs vivent de leur\n      métier, chacun d’entre nous doit pouvoir mettre en oeuvre cette volonté citoyenne\n      d’accompagner nos agricultures par son acte d'achat.");
			this.h();
		},
		l: function claim(nodes) {
			section0 = claim_element(nodes, "SECTION", { class: true });
			var section0_nodes = children(section0);
			div0 = claim_element(section0_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			h1 = claim_element(div0_nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, "Producteurs d'à côté");
			h1_nodes.forEach(detach_dev);
			t1 = claim_space(div0_nodes);
			p0 = claim_element(div0_nodes, "P", {});
			var p0_nodes = children(p0);
			strong = claim_element(p0_nodes, "STRONG", {});
			var strong_nodes = children(strong);
			t2 = claim_text(strong_nodes, "Trouver des produits fermiers à côté de chez vous.");
			strong_nodes.forEach(detach_dev);
			t3 = claim_text(p0_nodes, "Une carte vous permet de\n      localiser facilement tous les points de vente de produits agricoles locaux accessibles sur les\n      plateformes de nos partenaires.");
			p0_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			section0_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			section1 = claim_element(nodes, "SECTION", { class: true });
			var section1_nodes = children(section1);
			div7 = claim_element(section1_nodes, "DIV", { class: true });
			var div7_nodes = children(div7);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			div1 = claim_element(div6_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			figure = claim_element(div1_nodes, "FIGURE", { class: true });
			var figure_nodes = children(figure);
			img = claim_element(figure_nodes, "IMG", { height: true, width: true, src: true });
			figure_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t5 = claim_space(div6_nodes);
			div5 = claim_element(div6_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			form = claim_element(div5_nodes, "FORM", { action: true, method: true });
			var form_nodes = children(form);
			claim_component(geocoder.$$.fragment, form_nodes);
			t6 = claim_space(form_nodes);
			div4 = claim_element(form_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			select = claim_element(div2_nodes, "SELECT", { name: true });
			var select_nodes = children(select);
			option0 = claim_element(select_nodes, "OPTION", { value: true });
			var option0_nodes = children(option0);
			t7 = claim_text(option0_nodes, "Select dropdown");
			option0_nodes.forEach(detach_dev);
			option1 = claim_element(select_nodes, "OPTION", { value: true });
			var option1_nodes = children(option1);
			t8 = claim_text(option1_nodes, "With options");
			option1_nodes.forEach(detach_dev);
			select_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			t9 = claim_space(div4_nodes);
			p1 = claim_element(div4_nodes, "P", { class: true });
			var p1_nodes = children(p1);
			button = claim_element(p1_nodes, "BUTTON", { type: true, class: true });
			var button_nodes = children(button);
			t10 = claim_text(button_nodes, "Search");
			button_nodes.forEach(detach_dev);
			p1_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			form_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			div6_nodes.forEach(detach_dev);
			div7_nodes.forEach(detach_dev);
			section1_nodes.forEach(detach_dev);
			t11 = claim_space(nodes);
			section2 = claim_element(nodes, "SECTION", { class: true });
			var section2_nodes = children(section2);
			div8 = claim_element(section2_nodes, "DIV", { class: true });
			var div8_nodes = children(div8);
			h2 = claim_element(div8_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t12 = claim_text(h2_nodes, "Notre démarche en toute transparence");
			h2_nodes.forEach(detach_dev);
			t13 = claim_space(div8_nodes);
			p2 = claim_element(div8_nodes, "P", {});
			var p2_nodes = children(p2);
			t14 = claim_text(p2_nodes, "Cette plateforme est le fruit d'un partenariat entre les chambres d'agriculture et le\n      ministère de l'Agriculture et de l'Alimentation ouvert à toutes les plateformes de vente\n      directe de produits agricoles. Tous ensemble nous avons souhaité unir nos forces pour offrir\n      un point d'entrée unique aux consommateurs facilitant la recherche de produits fermiers de\n      proximité et une visibilité renforcée aux agricultrices et agriculteurs adhérents des\n      plateformes partenaires. Nous partageons l'objectif de favoriser les produits locaux car si\n      l'on on veut que notre agriculture reste française, que nos agriculteurs vivent de leur\n      métier, chacun d’entre nous doit pouvoir mettre en oeuvre cette volonté citoyenne\n      d’accompagner nos agricultures par son acte d'achat.");
			p2_nodes.forEach(detach_dev);
			div8_nodes.forEach(detach_dev);
			section2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "title is-1");
			add_location(h1, file, 17, 4, 413);
			add_location(strong, file, 19, 6, 476);
			add_location(p0, file, 18, 4, 466);
			attr_dev(div0, "class", "container");
			add_location(div0, file, 16, 2, 385);
			attr_dev(section0, "class", "section has-background-light");
			add_location(section0, file, 15, 0, 336);
			attr_dev(img, "height", "245");
			attr_dev(img, "width", "195");
			if (img.src !== (img_src_value = "https://bulma.io/images/placeholders/128x128.png")) attr_dev(img, "src", img_src_value);
			add_location(img, file, 30, 10, 893);
			attr_dev(figure, "class", "image is-128x128");
			add_location(figure, file, 29, 8, 849);
			attr_dev(div1, "class", "column");
			add_location(div1, file, 28, 6, 820);
			option0.__value = "Select dropdown";
			option0.value = option0.__value;
			add_location(option0, file, 40, 18, 1369);
			option1.__value = "With options";
			option1.value = option1.__value;
			add_location(option1, file, 41, 18, 1420);
			attr_dev(select, "name", "partners");
			add_location(select, file, 39, 16, 1326);
			attr_dev(div2, "class", "select is-fullwidth");
			add_location(div2, file, 38, 14, 1276);
			attr_dev(div3, "class", "control is-expanded");
			add_location(div3, file, 37, 12, 1228);
			attr_dev(button, "type", "submit");
			attr_dev(button, "class", "button is-info");
			add_location(button, file, 45, 31, 1547);
			attr_dev(p1, "class", "control");
			add_location(p1, file, 45, 12, 1528);
			attr_dev(div4, "class", "field is-grouped");
			add_location(div4, file, 36, 10, 1185);
			attr_dev(form, "action", "/farms/all");
			attr_dev(form, "method", "get");
			add_location(form, file, 34, 8, 1047);
			attr_dev(div5, "class", "column");
			add_location(div5, file, 33, 6, 1018);
			attr_dev(div6, "class", "columns");
			add_location(div6, file, 27, 4, 792);
			attr_dev(div7, "class", "container");
			add_location(div7, file, 26, 2, 764);
			attr_dev(section1, "class", "section");
			add_location(section1, file, 25, 0, 736);
			attr_dev(h2, "class", "title is-2");
			add_location(h2, file, 54, 4, 1768);
			add_location(p2, file, 55, 4, 1837);
			attr_dev(div8, "class", "container");
			add_location(div8, file, 53, 2, 1740);
			attr_dev(section2, "class", "section has-background-light");
			add_location(section2, file, 52, 0, 1691);
		},
		m: function mount(target, anchor) {
			insert_dev(target, section0, anchor);
			append_dev(section0, div0);
			append_dev(div0, h1);
			append_dev(h1, t0);
			append_dev(div0, t1);
			append_dev(div0, p0);
			append_dev(p0, strong);
			append_dev(strong, t2);
			append_dev(p0, t3);
			insert_dev(target, t4, anchor);
			insert_dev(target, section1, anchor);
			append_dev(section1, div7);
			append_dev(div7, div6);
			append_dev(div6, div1);
			append_dev(div1, figure);
			append_dev(figure, img);
			append_dev(div6, t5);
			append_dev(div6, div5);
			append_dev(div5, form);
			mount_component(geocoder, form, null);
			append_dev(form, t6);
			append_dev(form, div4);
			append_dev(div4, div3);
			append_dev(div3, div2);
			append_dev(div2, select);
			append_dev(select, option0);
			append_dev(option0, t7);
			append_dev(select, option1);
			append_dev(option1, t8);
			append_dev(div4, t9);
			append_dev(div4, p1);
			append_dev(p1, button);
			append_dev(button, t10);
			insert_dev(target, t11, anchor);
			insert_dev(target, section2, anchor);
			append_dev(section2, div8);
			append_dev(div8, h2);
			append_dev(h2, t12);
			append_dev(div8, t13);
			append_dev(div8, p2);
			append_dev(p2, t14);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(geocoder.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(geocoder.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(section0);
			if (detaching) detach_dev(t4);
			if (detaching) detach_dev(section1);
			destroy_component(geocoder);
			if (detaching) detach_dev(t11);
			if (detaching) detach_dev(section2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function preload(page, session) {
	
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Routes", slots, []);

	const navigateToCoords = event => {
		const [lng, lat] = event.detail.coords;
		goto(`/farms/all?coords=${lng},${lat}`);
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		preload,
		goto,
		Geocoder,
		navigateToCoords
	});

	return [navigateToCoords];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export default Routes;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguN2E0YTE3OWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxuICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZChwYWdlLCBzZXNzaW9uKSB7fVxuPC9zY3JpcHQ+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7IGdvdG8gfSBmcm9tICdAc2FwcGVyL2FwcCc7XG5cbiAgaW1wb3J0IEdlb2NvZGVyIGZyb20gJ0AvY29tcG9uZW50cy9HZW9jb2Rlci5zdmVsdGUnO1xuXG4gIGNvbnN0IG5hdmlnYXRlVG9Db29yZHMgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBbbG5nLCBsYXRdID0gZXZlbnQuZGV0YWlsLmNvb3JkcztcbiAgICBnb3RvKGAvZmFybXMvYWxsP2Nvb3Jkcz0ke2xuZ30sJHtsYXR9YCk7XG4gIH07XG48L3NjcmlwdD5cblxuPHNlY3Rpb24gY2xhc3M9XCJzZWN0aW9uIGhhcy1iYWNrZ3JvdW5kLWxpZ2h0XCI+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8aDEgY2xhc3M9XCJ0aXRsZSBpcy0xXCI+UHJvZHVjdGV1cnMgZCfDoCBjw7R0w6k8L2gxPlxuICAgIDxwPlxuICAgICAgPHN0cm9uZz5Ucm91dmVyIGRlcyBwcm9kdWl0cyBmZXJtaWVycyDDoCBjw7R0w6kgZGUgY2hleiB2b3VzLjwvc3Ryb25nPlVuZSBjYXJ0ZSB2b3VzIHBlcm1ldCBkZVxuICAgICAgbG9jYWxpc2VyIGZhY2lsZW1lbnQgdG91cyBsZXMgcG9pbnRzIGRlIHZlbnRlIGRlIHByb2R1aXRzIGFncmljb2xlcyBsb2NhdXggYWNjZXNzaWJsZXMgc3VyIGxlc1xuICAgICAgcGxhdGVmb3JtZXMgZGUgbm9zIHBhcnRlbmFpcmVzLlxuICAgIDwvcD5cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG48c2VjdGlvbiBjbGFzcz1cInNlY3Rpb25cIj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgIDxmaWd1cmUgY2xhc3M9XCJpbWFnZSBpcy0xMjh4MTI4XCI+XG4gICAgICAgICAgPGltZyBoZWlnaHQ9XCIyNDVcIiB3aWR0aD1cIjE5NVwiIHNyYz1cImh0dHBzOi8vYnVsbWEuaW8vaW1hZ2VzL3BsYWNlaG9sZGVycy8xMjh4MTI4LnBuZ1wiIC8+XG4gICAgICAgIDwvZmlndXJlPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgIDxmb3JtIGFjdGlvbj1cIi9mYXJtcy9hbGxcIiBtZXRob2Q9XCJnZXRcIj5cbiAgICAgICAgICA8R2VvY29kZXIgaWQ9XCJob21lLXNlYXJjaFwiIGdlb2xvY2F0b3I9e3RydWV9IG9uOmdlb2NvZGU9e25hdmlnYXRlVG9Db29yZHN9IC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkIGlzLWdyb3VwZWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sIGlzLWV4cGFuZGVkXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QgaXMtZnVsbHdpZHRoXCI+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCBuYW1lPVwicGFydG5lcnNcIj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24+U2VsZWN0IGRyb3Bkb3duPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uPldpdGggb3B0aW9uczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb250cm9sXCI+PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gaXMtaW5mb1wiPiBTZWFyY2ggPC9idXR0b24+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG48c2VjdGlvbiBjbGFzcz1cInNlY3Rpb24gaGFzLWJhY2tncm91bmQtbGlnaHRcIj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMiBjbGFzcz1cInRpdGxlIGlzLTJcIj5Ob3RyZSBkw6ltYXJjaGUgZW4gdG91dGUgdHJhbnNwYXJlbmNlPC9oMj5cbiAgICA8cD5cbiAgICAgIENldHRlIHBsYXRlZm9ybWUgZXN0IGxlIGZydWl0IGQndW4gcGFydGVuYXJpYXQgZW50cmUgbGVzIGNoYW1icmVzIGQnYWdyaWN1bHR1cmUgZXQgbGVcbiAgICAgIG1pbmlzdMOocmUgZGUgbCdBZ3JpY3VsdHVyZSBldCBkZSBsJ0FsaW1lbnRhdGlvbiBvdXZlcnQgw6AgdG91dGVzIGxlcyBwbGF0ZWZvcm1lcyBkZSB2ZW50ZVxuICAgICAgZGlyZWN0ZSBkZSBwcm9kdWl0cyBhZ3JpY29sZXMuIFRvdXMgZW5zZW1ibGUgbm91cyBhdm9ucyBzb3VoYWl0w6kgdW5pciBub3MgZm9yY2VzIHBvdXIgb2ZmcmlyXG4gICAgICB1biBwb2ludCBkJ2VudHLDqWUgdW5pcXVlIGF1eCBjb25zb21tYXRldXJzIGZhY2lsaXRhbnQgbGEgcmVjaGVyY2hlIGRlIHByb2R1aXRzIGZlcm1pZXJzIGRlXG4gICAgICBwcm94aW1pdMOpIGV0IHVuZSB2aXNpYmlsaXTDqSByZW5mb3Jjw6llIGF1eCBhZ3JpY3VsdHJpY2VzIGV0IGFncmljdWx0ZXVycyBhZGjDqXJlbnRzIGRlc1xuICAgICAgcGxhdGVmb3JtZXMgcGFydGVuYWlyZXMuIE5vdXMgcGFydGFnZW9ucyBsJ29iamVjdGlmIGRlIGZhdm9yaXNlciBsZXMgcHJvZHVpdHMgbG9jYXV4IGNhciBzaVxuICAgICAgbCdvbiBvbiB2ZXV0IHF1ZSBub3RyZSBhZ3JpY3VsdHVyZSByZXN0ZSBmcmFuw6dhaXNlLCBxdWUgbm9zIGFncmljdWx0ZXVycyB2aXZlbnQgZGUgbGV1clxuICAgICAgbcOpdGllciwgY2hhY3VuIGTigJllbnRyZSBub3VzIGRvaXQgcG91dm9pciBtZXR0cmUgZW4gb2V1dnJlIGNldHRlIHZvbG9udMOpIGNpdG95ZW5uZVxuICAgICAgZOKAmWFjY29tcGFnbmVyIG5vcyBhZ3JpY3VsdHVyZXMgcGFyIHNvbiBhY3RlIGQnYWNoYXQuXG4gICAgPC9wPlxuICA8L2Rpdj5cbjwvc2VjdGlvbj5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkNBbUNpRCxJQUFJOzs7OzhDQUFjLEdBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQWxDM0QsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPOzs7Ozs7OztPQVFyQyxnQkFBZ0IsR0FBSSxLQUFLO1NBQ3RCLEdBQUcsRUFBRSxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNO0VBQ3RDLElBQUksc0JBQXNCLEdBQUcsSUFBSSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
