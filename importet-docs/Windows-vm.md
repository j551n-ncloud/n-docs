Before we use PECU to passthrough our gpu 




Configuring the VM (Windows 10)

    Now comes the 'fun' part. It took me many, many different configuration attempts to get things just right. Hopefully my pain will be your gain, and help you get things done right, the first time around.

Step 1: Create a VM

    Making a Virtual Machine is pretty easy and self-explanatory, but if you are having issues, I suggest looking up the official Proxmox Wiki and How-To guides.

    For this guide, you'll need a Windows ISO for your Virtual Machine. Here's a handy guide on how to download an ISO file directly into Proxmox. You'll want to copy ALL your .ISO files to the proper repository folder under Proxmox (including the VirtIO driver ISO file mentioned below).

    Example Menu Screens

    General => OS => Hard disk => CPU => Memory => Network => Confirm

    IMPORTANT: DO NOT START YOUR VM (yet)

Step 1a (Optional, but RECOMMENDED): Download VirtIO drivers

    If you follow this guide and are using VirtIO, then you'll need this ISO file of the VirtIO drivers to mount as a CD-ROM in order to install Windows 10 using VirtIO (SCSI).

    For the CD-Rom, it's fine if you use IDE or SATA. Make sure CD-ROM is selected as the primary boot device under the Options tab, when you're done creating the VM. Also, you'll want to make sure you select VirtIO (SCSI, not VirtIO Block) for your Hard disk and Network Adapter.

Step 2: Enable OMVF (UEFI) for the VM

    Under your VM's Options Tab/Window, set the following up like so:

Boot Order: CD-ROM, Disk (scsi0)
SCSI Controller: VirtIO SCSI Single
BIOS: OMVF (UEFI)

    Don't Forget: When you change the BIOS from SeaBIOS (Default) to OMVF (UEFI), Proxmox will say something about adding an EFI disk. So you'll go to your Hardware Tab/Window and do that. Add > EFI Disk.

Step 3: Edit the VM Config File

    Going back to the Shell window, we need to edit /etc/pve/qemu-server/<vmid>.conf, where <vmid> is the VM ID Number you used during the VM creation (General Tab).

nano /etc/pve/qemu-server/<vmid>.conf

    In the editor, let's add these command lines (doesn't matter where you add them, so long as they are on new lines. Proxmox will move things around for you after you save):

machine: q35
cpu: host,hidden=1,flags=+pcid
args: -cpu 'host,+kvm_pv_unhalt,+kvm_pv_eoi,hv_vendor_id=NV43FIX,kvm=off'

    Save and exit the editor.

Step 4: Add PCI Devices (Your GPU) to VM
r/homelab - Look at all those GPUs
Look at all those GPUs

    Under the VM's Hardware Tab/Window, click on the Add button towards the top. Then under the drop-down menu, click PCI Device.

    Look for your GPU in the list, and select it. On the PCI options screen, you should only need to configure it like so:

All Functions: YES
Rom-Bar: YES
Primary GPU: NO
PCI-Express: YES (requires 'machine: q35' in vm config file)

    Here's an example image of what your Hardware Tab/Window should look like when you're done creating the VM.

r/homelab - Oopsies, make sure “All Functions” is CHECKED.
Oopsies, make sure “All Functions” is CHECKED.

Step 4a (Optional): ROM File Issues

    In the off chance that things don't work properly at the end, you MIGHT need to come back to this step and specify the ROM file for your GPU. This is a process unto itself, and requires some extra steps, as outlined below.

    Step 4a1:

    Download your GPU's ROM file

    OR

    Dump your GPU's ROM File:

cd /sys/bus/pci/devices/0000:01:00.0/
echo 1 > rom
cat rom > /usr/share/kvm/<GPURomFileName>.bin
echo 0 > rom

    Alternative Methods to Dump ROM File:

    a. Using GPU-Z (recommended)

    b. Using NVFlash

    Step 4a2: Copy the ROM file (if you downloaded it) to the /usr/share/kvm/ directory.

    You can use SFTP for this, or directly through Windows' Command Prompt:

scp /path/to/<romfilename>.rom myusername@proxmoxserveraddress:/usr/share/kvm/<romfilename>.rom

    Step 4a3: Add the ROM file to your VM Config (EXAMPLE):

hostpci0: 01:00,pcie=1,romfile=<GTX1050ti>.rom

    NVIDIA USERS: If you're still experiencing issues, or the ROM file is causing issues on its own, you might need to patch the ROM file (particularly for NVIDIA cards). There's a great tool for patching GTX 10XX series cards here: https://github.com/sk1080/nvidia-kvm-patcher and here https://github.com/Matoking/NVIDIA-vBIOS-VFIO-Patcher. It only works for 10XX series though. If you have something older, you'll have to patch the ROM file manually using a hex editor, which is beyond the scope of this tutorial guide.

r/homelab - Example of the Hardware Tab/Window, Before Windows 10 Installation.
Example of the Hardware Tab/Window, Before Windows 10 Installation.

Step 5: START THE VM!

    We're almost at the home stretch! Once you start your VM, open your noVNC / Shell Tab/Window (under the VM Tab), and you should see the Windows installer booting up. Let's quickly go through the process, since it can be easy to mess things up at this junction.

Final Setup: Installing / Configuring Windows 10
r/homelab - Copyright(c) Jon Spraggins (https://jonspraggins.com)
Copyright(c) Jon Spraggins (https://jonspraggins.com)

    If you followed the guide so far and are using VirtIO SCSI, you'll run into an issue during the Windows 10 installation, when it tries to find your hard drive. Don't worry!

r/homelab - Copyright(c) Jon Spraggins (https://jonspraggins.com)
Copyright(c) Jon Spraggins (https://jonspraggins.com)

Step 1: VirtIO Driver Installation

    Simply go to your VM's Hardware Tab/Window (again), double click the CD-ROM drive file (it should currently have the Windows 10 ISO loaded), and switch the ISO image to the VirtIO ISO file.

r/homelab - Copyright(c) Jon Spraggins (https://jonspraggins.com)
Copyright(c) Jon Spraggins (https://jonspraggins.com)

    Tabbing back to your noVNC Shell window, click Browse, find your newly loaded VirtIO CD-ROM drive, and go to the vioscsi > w10 > amd64 sub-directory. Click OK.

    Now the Windows installer should do its thing and load the Red Hat VirtIO SCSI driver for your hard drive. Before you start installing to the drive, go back again to the VirtIO CD-Rom, and also install your Network Adapter VirtIO drivers from NetKVM > w10 > amd64 sub-directory.

r/homelab - Copyright(c) Jon Spraggins (https://jonspraggins.com)
Copyright(c) Jon Spraggins (https://jonspraggins.com)

    IMPORTANT #1: Don't forget to switch back the ISO file from the VirtIO ISO image to your Windows installer ISO image under the VM Hardware > CD-Rom.

    When you're done changing the CD-ROM drive back to your Windows installer ISO, go back to your Shell window and click Refresh. The installer should then have your VM's hard disk appear and have windows ready to be installed. Finish your Windows installation.

    IMPORTANT #2: When Windows asks you to restart, right click your VM and hit 'Stop'. Then go to your VM's Hardware Tab/Window, and Unmount the Windows ISO from your CD-Rom drive. Now 'Start' your VM again.

Step 2: Enable Windows Remote Desktop

    If all went well, you should now be seeing your Windows 10 VM screen! It's important for us to enable some sort of remote desktop access, since we will be disabling Proxmox's noVNC / Shell access to the VM shortly. I prefer to use Windows' built-in Remote Desktop Client. Here's a great, simple tutorial on enabling RDP access.

    NOTE: While you're in the Windows VM, make sure to make note of your VM's Username, internal IP address and/or computer name.

Step 3: Disabling Proxmox noVNC / Shell Access

    To make sure everything is properly configured before we get the GPU drivers installed, we want to disable the built-in video display adapter that shows up in the Windows VM. To do this, we simply go to the VM's Hardware Tab/Window, and under the Display entry, we select None (none) from the drop-down list. Easy. Now 'Stop' and then 'Start' your Virtual Machine.

    NOTE: If you are not able to (re)connect to your VM via Remote Desktop (using the given internal IP address or computer name / hostname), go back to the VM's Hardware Tab/Window, and under the PCI Device Settings for your GPU, checkmark Primary GPU**. Save it, then 'Stop' and 'Start' your VM again.**

Step 4: Installing GPU Drivers

    At long last, we are almost done. The final step is to get your GPU's video card drivers installed. Since I'm using NVIDIA for this tutorial, we simply go to http://nvidia.com and browse for our specific GPU model's driver (in this case, GTX 10XX series). While doing this, I like to check Windows' Device Manager (under Control Panel) to see if there are any missing VirtIO drivers, and/or if the GPU is giving me a Code 43 Error. You'll most likely see the Code 43 error on your GPU, which is why we are installing the drivers. If you're missing any VirtIO (usually shows up as 'PCI Device' in Device Manager, with a yellow exclamation), just go back to your VM's Hardware Tab/Window, repeat the steps to mount your VirtIO ISO file on the CD-Rom drive, then point the Device Manager in Windows to the CD-Rom drive when it asks you to add/update drivers for the Unknown device.

    Sometimes just installing the plain NVIDIA drivers will throw an error (something about being unable to install the drivers). In this case, you'll have to install using NVIDIA's crappy GeForce Experience(tm) installer. It sucks because you have to create an account and all that, but your driver installation should work after that.

Congratulations!

    After a reboot or two, you should now be able to see NVIDIA Control Panel installed in your Windows VM, as well as Device Manager showing no Code 43 Errors on your GPU(s). Pat yourself on the back, do some jumping jacks, order a cake! You've done it!
