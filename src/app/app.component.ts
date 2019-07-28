import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { HttpService } from './http.service';
import { Company, Group, Elem } from './company';

export class Node {
    name: string;
    children?: Node[];
}

export class ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'tree-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [HttpService]
})

export class AppComponent {
    companies: Company[] = [];
    groups: Group[] = [];
    elems: Elem[] = [];

    initData() {
        let treeData: Node[] = [];

        let dictionary = {};

        this.groups.forEach(group => {
            let node = dictionary[group.id];

            if (!node) {
                dictionary[group.id] = node = { 
                    name: group.name, 
                    children: [] 
                };
            } else {
                node.name = group.name;
            }

            if (group.companyId) {
                let company = this.companies.find(x => x.id === group.companyId);
                node.children.push({ name: company.name});
            }

            if (group.parentGroupId) {
                let par = dictionary[group.parentGroupId];

                if (!par) {
                    dictionary[group.parentGroupId] = par = { children: [] };
                }

                par.children.push(node);
            } else {
                treeData.push(node);
            }
        });

        this.elems.forEach(currElem => {
            let group = dictionary[currElem.groupId];
            if (group) {
                group.children.push({name: currElem.name});
            }
        });

        this.dataSource.data = treeData;
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    private _transformer = (node: Node, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor(private httpService: HttpService) {
        this.httpService.connect().subscribe(() => {
            this.httpService.getCompaniesList().subscribe(data => {
                this.companies = data["companies"];
                this.httpService.getObjectGroupsList().subscribe(data => {
                    this.groups = data["groups"];
                    this.httpService.getObjectsList().subscribe(data => {
                        this.elems = data["objects"];
                        this.initData();
                    }, dataError => console.log(dataError));
                }, dataError => console.log(dataError));
            }, dataError => console.log(dataError));
        }, connectError => console.log(connectError));
    }
}