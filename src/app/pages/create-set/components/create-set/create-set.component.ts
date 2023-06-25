import {Component, Input, OnInit} from '@angular/core';
import {SetProvider} from "../../../../app-core/providers/set.provider";
import {SetIconModel} from "../../../set/model/dto/set-icon.model";
import {SetAddCommand} from "../../model/command/set-add.command";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.less']
})
export class CreateSetComponent implements OnInit {
  setIconList: SetIconModel[] = [];
  selectedIconId!: number;
  @Input() setIconId!: number;
  setName!: string;
  constructor(private setProvider: SetProvider,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.getSetIcons();
  }

  getSetIcons() {
    this.setProvider.getSetIcons().subscribe((res: SetIconModel[]) => {
      this.setIconList = res
      console.log(this.setIconList)
    });
  }

  getIconPath(iconId: number): string {
    const icon = this.setIconList.find(setIcon => setIcon.id === iconId);
    return icon ? icon.icon_path : '';
  }

  addSet(): void {
    if (this.selectedIconId !== null) {
      const userId = localStorage.getItem('userId');
      const command: SetAddCommand = {
        name: this.setName,
        user_id: userId,
        icon_svg_uri: this.getIconPath(this.selectedIconId),
        };
      console.log(command);

      this.setProvider.addSet(command).subscribe({
        next: () => {
          this.message.success('Set added successfully.');
        },
        error: (error) => {
          this.message.error('Error adding set. Please try again later.');
        }
      })
    }
  }
}
