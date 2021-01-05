import {
    ChangeDetectorRef,
    Component,
    Injectable,
    OnInit,
} from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
    MatTreeFlattener,
    MatTreeFlatDataSource,
} from "@angular/material/tree";
import {
    CollectionViewer,
    SelectionChange,
    SelectionModel,
} from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import { map } from "rxjs/operators/map";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FuseConfigService } from "@fuse/services/config.service";

/**
 * Node for game
 */
export class GameNode {
    children: BehaviorSubject<GameNode[]>;
    constructor(public item: string, children?: GameNode[]) {
        this.children = new BehaviorSubject(
            children === undefined ? [] : children
        );
    }
}

/**
 * The list of games
 */
const TREE_DATA = [
    new GameNode("api", [
        new GameNode("request"),
        new GameNode("actions"),
    ]),
    new GameNode("configuration", [
        new GameNode(`modules`, [
            new GameNode(`analytics`),
            new GameNode(`builtin`),
            new GameNode(`channel web`),
        ]),
        new GameNode("dialog"),
        new GameNode("hints"),
        new GameNode("hooks"),
    ]),
    new GameNode("janitor", [new GameNode("Overcooked")]),
    new GameNode("realtime", [new GameNode("Rise to ruins")]),
    new GameNode("telemetry", [
        new GameNode("services", [
            new GameNode("Magicka 1"),
            new GameNode("Magicka 2"),
        ]),
    ]),
];
/**
 * @title Tree with checklist
 */

@Component({
    selector: "app-debug",
    templateUrl: "./debug.component.html",
    styleUrls: ["./debug.component.scss"],
})
export class DebugComponent implements OnInit {
    levels = new Map<GameNode, number>();
    treeControl: FlatTreeControl<GameNode>;

    treeFlattener: MatTreeFlattener<GameNode, GameNode>;

    dataSource: MatTreeFlatDataSource<GameNode, GameNode>;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService
    ) {
        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren
        );
        this.treeControl = new FlatTreeControl<GameNode>(
            this.getLevel,
            this.isExpandable
        );
        this.dataSource = new MatTreeFlatDataSource(
            this.treeControl,
            this.treeFlattener
        );
        this.dataSource = new MatTreeFlatDataSource(
            this.treeControl,
            this.treeFlattener
        );
        this.dataSource.data = TREE_DATA;
    }

    getLevel = (node: GameNode): number => {
        return this.levels.get(node) || 0;
    };

    isExpandable = (node: GameNode): boolean => {
        return node.children.value.length > 0;
    };

    getChildren = (node: GameNode) => {
        return node.children;
    };

    transformer = (node: GameNode, level: number) => {
        this.levels.set(node, level);
        return node;
    };

    hasChildren = (index: number, node: GameNode) => {
        return this.isExpandable(node);
    };

    /** The selection for checklist */
    checklistSelection = new SelectionModel<GameNode>(true /* multiple */);

    /** Whether all the descendants of the node are selected */
    descendantsAllSelected(node: GameNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        if (!descendants.length) {
            return this.checklistSelection.isSelected(node);
        }
        const selected = this.checklistSelection.isSelected(node);
        const allSelected = descendants.every((child) =>
            this.checklistSelection.isSelected(child)
        );
        if (!selected && allSelected) {
            this.checklistSelection.select(node);
            this.changeDetectorRef.markForCheck();
        }
        return allSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: GameNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        if (!descendants.length) {
            return false;
        }
        const result = descendants.some((child) =>
            this.checklistSelection.isSelected(child)
        );
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the game selection. Select/deselect all the descendants node */
    nodeSelectionToggle(node: GameNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants, node)
            : this.checklistSelection.deselect(...descendants, node);
        this.changeDetectorRef.markForCheck();
    }

    ngOnInit() {
        this._fuseNavigationService.removeNavigationItem("HelpDesk");
        this._fuseNavigationService.removeNavigationItem("Accounts");
        this._fuseNavigationService.removeNavigationItem("knowledgeBase");
        this._fuseNavigationService.removeNavigationItem("aiBots");
        this._fuseNavigationService.removeNavigationItem("announcement");
        this._fuseNavigationService.removeNavigationItem("aiBotsManagement");
        this._fuseNavigationService.removeNavigationItem("health");

        const customFunctionNavItem = {
            id: "aiBots",
            title: "WorkSpace",
            translate: "WorkSpace",
            type: "group",
            children: [
                {
                    id: "Bots",
                    title: "Bots",
                    translate: "Bots",
                    type: "item",
                    icon: "android",
                    exactMatch: true,
                    url: "/ai-bot",
                },
                {
                    id: "Logs",
                    title: "Logs",
                    translate: "Logs",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/logs",
                },
            ],
        };
        const customFunctionNavItem2 = {
            id: "aiBotsManagement",
            title: "Management",
            translate: "Management",
            type: "group",
            children: [
                {
                    id: "sourceControl",
                    title: "Source Control",
                    translate: "Source Control",
                    type: "item",
                    icon: "android",
                    exactMatch: true,
                    url: "/ai-bot/source-control",
                },
                {
                    id: "serverLicense",
                    title: "Server License",
                    translate: "Server License",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/server-license",
                },
                {
                    id: "languages",
                    title: "Languages",
                    translate: "Languages",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/languages",
                },
                {
                    id: "modules",
                    title: "Production Checklist",
                    translate: "Production Checklist",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/production-checklist",
                },
                {
                    id: "checklist",
                    title: "Modules",
                    translate: "Modules",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/modules",
                },
            ],
        };
        const customFunctionNavItem3 = {
            id: "health",
            title: "Health",
            translate: "Health",
            type: "group",
            children: [
                {
                    id: "Monitoring",
                    title: "Monitoring",
                    translate: "Monitoring",
                    type: "item",
                    icon: "android",
                    exactMatch: true,
                    url: "/ai-bot/monitoring",
                },
                {
                    id: "alerting",
                    title: "Alerting",
                    translate: "Alerting",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/alerting",
                },
                {
                    id: "debug",
                    title: "Debug",
                    translate: "Debug",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/debug",
                },
            ],
        };
        const customFunctionNavItem4 = {
            id: "announcement",
            title: "Announcement",
            translate: "Announcement",
            type: "group",
            children: [
                {
                    id: "latest",
                    title: "Latest Release",
                    translate: "Latest Release",
                    type: "item",
                    icon: "android",
                    exactMatch: true,
                    url: "/ai-bot/latest-release",
                },
            ],
        };

        this._fuseNavigationService.addNavigationItem(
            customFunctionNavItem,
            "end"
        );
        this._fuseNavigationService.addNavigationItem(
            customFunctionNavItem2,
            "end"
        );
        this._fuseNavigationService.addNavigationItem(
            customFunctionNavItem3,
            "end"
        );
        this._fuseNavigationService.addNavigationItem(
            customFunctionNavItem4,
            "end"
        );

        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false,
                },
                toolbar: {
                    hidden: false,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }
}
